"""
Regenerate database/schema.sql from the SQLAlchemy models in backend/app/models.py.

Usage (from the repository root):
    python database/generate_schema.py

The DDL is emitted for SQLite, which is the development database engine.
"""
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "backend"))

from sqlalchemy.dialects import sqlite  # noqa: E402
from sqlalchemy.schema import CreateIndex, CreateTable  # noqa: E402

from app.models import Base  # noqa: E402

HEADER = """-- MedNex database schema (SQLite DDL)
-- Generated from backend/app/models.py by database/generate_schema.py.
-- Do not edit by hand; regenerate after changing the models.

"""


def main() -> None:
    dialect = sqlite.dialect()
    chunks = [HEADER]
    for table in Base.metadata.sorted_tables:
        ddl = str(CreateTable(table).compile(dialect=dialect)).strip()
        chunks.append(ddl + ";\n")
        for index in table.indexes:
            idx = str(CreateIndex(index).compile(dialect=dialect)).strip()
            chunks.append(idx + ";")
        chunks.append("")

    out = REPO_ROOT / "database" / "schema.sql"
    out.write_text("\n".join(chunks).rstrip() + "\n", encoding="utf-8")
    print(f"Wrote {out} ({len(Base.metadata.sorted_tables)} tables)")


if __name__ == "__main__":
    main()
