import base64

with open('aperio_monument_hd.png', 'rb') as f:
    b64 = base64.b64encode(f.read()).decode('utf-8')

print('Data URI length:', len(b64))

with open('monument_asset.js', 'w', encoding='utf-8') as f:
    f.write('window.APERIO_MONUMENT_DATA_URI = "data:image/png;base64,' + b64 + '";\n')

print('Saved monument_asset.js successfully')
