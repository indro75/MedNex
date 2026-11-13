"""
Start the MedNex FastAPI Backend Server
"""
import sys
from pathlib import Path
import uvicorn

backend_dir = str(Path(__file__).resolve().parent)
repo_root = str(Path(__file__).resolve().parent.parent)
for p in (backend_dir, repo_root):
    if p not in sys.path:
        sys.path.insert(0, p)

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True, app_dir=backend_dir)

