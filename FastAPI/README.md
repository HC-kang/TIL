# FastAPI

## 자주쓰는 명령어

```shell
exec uvicorn --reload --host $HOST --port $PORT "$APP_MODULE"

# example
uvicorn main:app --reload
```

```shell
alembic init

alembic revision -m "${RevisionName}"

# autogenerate
    # 주의점
    # from app.db.base import Base  # noqa
    # from app.core.config import settings

    # target_metadata = Base.metadata
# target_metadata가 바라보는 Base에 
    # from app.models.recipe import Recipe  # noqa
# 위처럼 모델을 import 해주어야 함.

alembic revision --autogenerate -m "${RevisionName}"

alembic upgrade ${RevisionID}

alembic downgrade -1

alembic upgrade head
```
