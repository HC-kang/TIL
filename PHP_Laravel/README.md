# php 공부 기록

## [laravel 실습](https://www.youtube.com/watch?v=lM4nd2jTHZo&t=1774s)
- npm run dev 실행 시 laravel Mix 대신 vite 서버가 올라가는 현상..
    - [참고](https://stackoverflow.com/questions/72793590/i-cant-run-npm-run-dev-since-laravel-updated-with-vite)


## 아티즌 명령어

> php artisan list

> php artisan make:seeders
>
> php artisan make:model --migration --controller
- php artisan make: 명령어를 이용해서 model, migration, controller, seeder등을 추가 할 수 있음


## Model, Migration
- Laravel에서는 model -> migration이 아님
    
    > php artisan migrate:refresh --path=/database/migrations/2022_08_04_082832_create_schedule_times_table.php
    - 특정 migration만 선택해서 새로 적용

## Seeding
- database/seeders 디렉터리에 위치.
- 초기에 필요한 데이터를 DB에 insert 할 수 있음.

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeders.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'password' => Hash::make('password'),
        ]);
    }
}
```

> php artisan db:seed --class=ScheduleTimeSeeder
- 특정 seeder만 선택해서 실행

## Carbon

1. Day, Hour 등등.. 시간대의 시작 및 종료시점을 반환

    ```php
    startOfDay()
    startOfHour()
    endOfDay()
    endOfHour()
    ```

2. format('Y-m-d') 없이도 시간 포멧 변환

    ```php
    toDateString()
    ```

3. Others

    ```php
    diffInDays()
    ```

## Schedule

> php artisan schedule:work

- 보통 로컬에서는 스케줄러를 가동하지 않음. 그러나 필요시 위 명령어로 작동할 수 있음

> php artisan {signature} {flags}

- 개별 커맨드로도 쉘처럼 활용 가능

## Queue

> php artisan queue:work

- queue에 등록된 job들을 순차적으로 실행하는 워커를 작동시키는 명령어
- 타임아웃 등의 이유로 종료되기 때문에, Supervisor에 의해 지속적으로 감시와 상태관리가 필요함
- long-lived process이기에 관련 옵션을 메모리에 저장하고, 이로인해 옵션 변경시에는 재시작을 꼭 해줘야 적용됨.
- 옵션
  
  ```php
  {connection? : The name of the queue connection to work}
  {--name=default : The name of the worker}
  {--queue= : The names of the queues to work}
  {--daemon : Run the worker in daemon mode (Deprecated)}
  {--once : Only process the next job on the queue}
  {--stop-when-empty : Stop when the queue is empty}
  {--delay=0 : The number of seconds to delay failed jobs (Deprecated)}
  {--backoff=0 : The number of seconds to wait before retrying a job that encountered an uncaught exception}
  {--max-jobs=0 : The number of jobs to process before stopping}
  {--max-time=0 : The maximum number of seconds the worker should run}
  {--force : Force the worker to run even in maintenance mode}
  {--memory=128 : The memory limit in megabytes}
  {--sleep=3 : Number of seconds to sleep when no job is available}
  {--rest=0 : Number of seconds to rest between jobs}
  {--timeout=60 : The number of seconds a child process can run}
  {--tries=1 : Number of times to attempt a job before logging it failed}';
  ```

> php artisan queue:listen

- work와 같은 기능을 하지만, 로컬에서 사용하기 위한 기능
- 재시작 없이도 변경사항이 적용됨
- **prod 환경에서 사용 금지**

## Enum

- Laravel 9부터 Enum이 추가되었음.

### AS-IS
```php
<?php

namespace Enum;

class UserRoleStatusFlag
{
    const ADMIN = 'admin';
    const VISITOR = 'visitor';
    const EDITOR = 'editor';
}
```

### TO-BE

```php
<?php

namespace Enum;

enum UserRoleEnum: string
{
    case ADMIN = 'admin';
    case VISITOR = 'visitor';
    case EDITOR = 'editor';
}
```

### Eloquent

1. ->count() vs ->get()->count()
    - ->get()->count()
        - Eloquent model object를 메모리에 올리고 count
    - ->count()
        - DB상에서 count -> 대체로 성능이 더 우수함.

2. attach() & detach()

```php
$Branch->Days()->attach($input['DayIds']);
```

attach, detach 메소드를 활용해서 다대다 연관관계를 표현 할 수 있음.

```php
$Branch->Days()->detach();
```

필요없어진 경우 detach로 삭제 가능

```php
$Branch->Days()->sync();
```

수정소요가 있을땐 sync로 수정도 가능
