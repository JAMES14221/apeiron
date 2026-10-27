import os
import json
import base64
import numpy as np
from PIL import Image, ImageFilter
from scipy.ndimage import distance_transform_edt

def main():
    img_path = r'C:\Users\Hcongthanh\.gemini\antigravity\brain\fbc96872-64b4-4eca-bdab-f3cae36b6c68\.user_uploaded\media_1790501899989.jpg'
    img = Image.open(img_path).convert('RGB')
    orig_w, orig_h = img.size

    # Extract clean RGBA texture
    arr = np.array(img, dtype=np.float32) / 255.0
    lum = 0.299 * arr[:,:,0] + 0.587 * arr[:,:,1] + 0.114 * arr[:,:,2]
    blue = arr[:,:,2]

    # Smooth alpha mask
    alpha = np.clip((blue - 0.05) / 0.16, 0.0, 1.0) * np.clip((lum - 0.03) / 0.10, 0.0, 1.0)
    alpha_img = Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.0))
    alpha = np.array(alpha_img, dtype=np.float32) / 255.0

    rgba = np.zeros((orig_h, orig_w, 4), dtype=np.uint8)
    rgba[:,:,0] = np.clip(arr[:,:,0] * 255, 0, 255).astype(np.uint8)
    rgba[:,:,1] = np.clip(arr[:,:,1] * 255, 0, 255).astype(np.uint8)
    rgba[:,:,2] = np.clip(arr[:,:,2] * 255, 0, 255).astype(np.uint8)
    rgba[:,:,3] = np.clip(alpha * 255, 0, 255).astype(np.uint8)

    clean_tex = Image.fromarray(rgba, 'RGBA')
    clean_tex.save('monument_diffuse_clean.png')

    with open('monument_diffuse_clean.png', 'rb') as f:
        b64_tex = base64.b64encode(f.read()).decode('utf-8')
    data_uri = f'data:image/png;base64,{b64_tex}'

    # Target resolution for 3D solid geometry (approx 90x120 grid)
    mesh_w, mesh_h = 84, 112
    img_small = img.resize((mesh_w, mesh_h), Image.Resampling.LANCZOS)
    arr_s = np.array(img_small, dtype=np.float32) / 255.0
    lum_s = 0.299 * arr_s[:,:,0] + 0.587 * arr_s[:,:,1] + 0.114 * arr_s[:,:,2]
    blue_s = arr_s[:,:,2]

    mask_s = (np.clip((blue_s - 0.05) / 0.16, 0.0, 1.0) * np.clip((lum_s - 0.03) / 0.10, 0.0, 1.0)) > 0.15
    dist = distance_transform_edt(mask_s)
    dist_norm = np.clip(dist / 5.0, 0.0, 1.0)
    depth_map = (dist_norm * 0.55 + lum_s * 0.45) * mask_s

    aspect = orig_h / orig_w
    world_h = 4.4
    world_w = world_h / aspect
    max_thickness = 0.35

    v_grid_front = {}
    v_grid_back = {}
    positions = []
    uvs = []
    normals = []
    indices = []

    def add_vertex(x, y, z, u, v, nx, ny, nz):
        idx = len(positions) // 3
        positions.extend([round(float(x), 4), round(float(y), 4), round(float(z), 4)])
        uvs.extend([round(float(u), 4), round(float(v), 4)])
        normals.extend([round(float(nx), 4), round(float(ny), 4), round(float(nz), 4)])
        return idx

    # Front and Back vertices
    for r in range(mesh_h):
        for c in range(mesh_w):
            if mask_s[r, c]:
                u = c / (mesh_w - 1)
                v = 1.0 - (r / (mesh_h - 1))
                x = (u - 0.5) * world_w
                y = (v - 0.5) * world_h
                z_val = depth_map[r, c] * max_thickness

                dzdx = (depth_map[r, min(c+1, mesh_w-1)] - depth_map[r, max(c-1, 0)]) * max_thickness
                dzdy = (depth_map[max(r-1, 0), c] - depth_map[min(r+1, mesh_h-1), c]) * max_thickness
                norm_v = np.array([-dzdx, dzdy, 0.14], dtype=np.float32)
                norm_v /= (np.linalg.norm(norm_v) + 1e-6)

                idx_f = add_vertex(x, y, z_val, u, v, norm_v[0], norm_v[1], norm_v[2])
                v_grid_front[(r, c)] = idx_f

                idx_b = add_vertex(x, y, -z_val, u, v, norm_v[0], norm_v[1], -norm_v[2])
                v_grid_back[(r, c)] = idx_b

    # Front faces
    for r in range(mesh_h - 1):
        for c in range(mesh_w - 1):
            p00 = v_grid_front.get((r, c))
            p10 = v_grid_front.get((r + 1, c))
            p01 = v_grid_front.get((r, c + 1))
            p11 = v_grid_front.get((r + 1, c + 1))

            if p00 is not None and p10 is not None and p01 is not None and p11 is not None:
                indices.extend([p00, p10, p01])
                indices.extend([p01, p10, p11])

    # Back faces
    for r in range(mesh_h - 1):
        for c in range(mesh_w - 1):
            p00 = v_grid_back.get((r, c))
            p10 = v_grid_back.get((r + 1, c))
            p01 = v_grid_back.get((r, c + 1))
            p11 = v_grid_back.get((r + 1, c + 1))

            if p00 is not None and p10 is not None and p01 is not None and p11 is not None:
                indices.extend([p00, p01, p10])
                indices.extend([p01, p11, p10])

    # Rim connection walls along boundary
    for r in range(mesh_h - 1):
        for c in range(mesh_w - 1):
            # Check edge between (r, c) and (r, c+1)
            curr_in = (r, c) in v_grid_front
            right_in = (r, c + 1) in v_grid_front
            down_in = (r + 1, c) in v_grid_front

            if curr_in and not right_in and down_in:
                # Vertical boundary edge on the right
                f0 = v_grid_front[(r, c)]
                f1 = v_grid_front[(r + 1, c)]
                b0 = v_grid_back[(r, c)]
                b1 = v_grid_back[(r + 1, c)]
                indices.extend([f0, f1, b0])
                indices.extend([b0, f1, b1])

            if not curr_in and right_in and (r + 1, c + 1) in v_grid_front:
                # Vertical boundary edge on the left
                f0 = v_grid_front[(r, c + 1)]
                f1 = v_grid_front[(r + 1, c + 1)]
                b0 = v_grid_back[(r, c + 1)]
                b1 = v_grid_back[(r + 1, c + 1)]
                indices.extend([f0, b0, f1])
                indices.extend([b0, b1, f1])

    print(f"Total Vertices: {len(positions)//3}, Triangles: {len(indices)//3}")

    js_content = f"""// Real 3D Volumetric Crystal Geometry Asset for Aperio Monument
window.APERIO_3D_DIFFUSE_URI = "{data_uri}";
window.APERIO_3D_GEOMETRY = {{
    positions: {json.dumps(positions)},
    uvs: {json.dumps(uvs)},
    normals: {json.dumps(normals)},
    indices: {json.dumps(indices)}
}};
"""
    with open('monument_geometry.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    print("monument_geometry.js created successfully! Size:", os.path.getsize('monument_geometry.js') // 1024, "KB")

if __name__ == '__main__':
    main()
