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

