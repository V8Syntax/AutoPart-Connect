# Adding 3D Model URLs to Your Database

This guide explains how to add the `model_url` field to your parts database and populate it with 3D model URLs.

## Step 1: Run the Migration Script

Open PowerShell in the project root directory and run:

```powershell
psql -U postgres -d autopart_connect -f add-model-urls.sql
```

This will:
- Add the `model_url` column to the `parts` table
- Create an index for faster lookups
- Add sample model URLs for testing

## Step 2: Get Free 3D Models

### Option A: Use Free Model Libraries

**Recommended Sources:**
1. **Sketchfab** (https://sketchfab.com)
   - Search for "car parts", "brake disc", "engine parts"
   - Filter by "Downloadable" and "Free"
   - Download as `.glb` format

2. **Poly Haven** (https://polyhaven.com/models)
   - High-quality free models
   - Download as `.glb`

3. **glTF Sample Models** (GitHub)
   - https://github.com/KhronosGroup/glTF-Sample-Models
   - Good for testing

### Option B: Create Your Own Models

Use **Blender** (free 3D software):
1. Download Blender: https://www.blender.org
2. Model your part or import CAD files
3. Export as `.glb` (File → Export → glTF 2.0)

## Step 3: Store Models in Your Project

Create a models directory in your frontend:

```powershell
mkdir client\public\models
```

Place your `.glb` files there:
```
client/public/models/
  ├── brake-disc.glb
  ├── oil-filter.glb
  ├── spark-plug.glb
  └── air-filter.glb
```

## Step 4: Update Database with Local Model URLs

Connect to your database:

```powershell
psql -U postgres -d autopart_connect
```

Update parts with local model URLs:

```sql
-- Update brake parts
UPDATE parts 
SET model_url = '/models/brake-disc.glb' 
WHERE category = 'Brakes';

-- Update filter parts
UPDATE parts 
SET model_url = '/models/oil-filter.glb' 
WHERE category = 'Filters';

-- Update specific part by ID
UPDATE parts 
SET model_url = '/models/spark-plug.glb' 
WHERE id = 'your-part-id-here';

-- Verify the updates
SELECT name, category, model_url FROM parts WHERE model_url IS NOT NULL;
```

## Step 5: Test the 3D Viewer

1. Make sure both servers are running:
   ```powershell
   # Terminal 1 - Backend
   npm start

   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

2. Open http://localhost:5173/catalog

3. Click on any part card with a `model_url`

4. The 3D viewer should load your custom model!

## Quick Test with Sample Model

To quickly test without downloading models, use this public test model:

```sql
UPDATE parts 
SET model_url = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb'
WHERE id = (SELECT id FROM parts LIMIT 1);
```

## Fallback Behavior

If a part doesn't have a `model_url` or the model fails to load:
- ✅ **BrakeDisc** model shows as default
- ✅ **GenericComponent** shows if loading fails
- ✅ Never shows an empty screen

## Recommended Model Specifications

For best performance:
- **Format**: `.glb` (binary glTF)
- **File Size**: < 5MB per model
- **Polygons**: < 50,000 triangles
- **Textures**: 1024x1024 or smaller

## Example: Finding Brake Disc Models on Sketchfab

1. Go to https://sketchfab.com/search?q=brake+disc&type=models
2. Filter: "Downloadable" + "Free"
3. Click a model → Download → Select "glTF Binary (.glb)"
4. Save to `client/public/models/brake-disc.glb`
5. Update database:
   ```sql
   UPDATE parts SET model_url = '/models/brake-disc.glb' WHERE category = 'Brakes';
   ```

## Troubleshooting

**Model doesn't load:**
- Check browser console for errors
- Verify file path is correct
- Ensure model file exists in `client/public/models/`
- Check file permissions

**Model is too small/large:**
- The Scene component auto-scales models
- If still wrong, adjust scale in Scene.jsx

**Model is off-center:**
- The Scene component auto-centers models
- Check if model has correct origin in Blender
