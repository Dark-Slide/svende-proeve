<?php

namespace Feature\Order;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class OrdersTest extends TestCase
{
    use RefreshDatabase;

    private string $orders_uri  = '/api/orders';
    private string $order_uri   = '/api/order';
    private string $orders_by_user_uri = '/api/orders/user';

    public function test_orders_index_returns_all(): void
    {

        $user = $this->create_user_for_test();

        // Insert 4 orders
        for ($i = 1; $i <= 4; $i++) {
            DB::table('orders')->insert([
                'user_id' => $user->id,
                'status' => 'open',
                'price' => 100 + $i,
            ]);
        }

        $response = $this->getJson($this->orders_uri)->assertOk();

        $response->assertJson(fn (AssertableJson $json) =>
            $json->where('message', 'Orders fetched successfully')
                ->has('data', 4)
        );

    }

    public function test_order_show_returns_order_or_404(): void
    {

        $user = $this->create_user_for_test();

        $id = DB::table('orders')->insertGetId([
            'user_id' => $user->id,
            'status' => 'open',
            'price' => 150,
        ]);

        $this->getJson("{$this->order_uri}/{$id}")
            ->assertOk()
            ->assertJsonPath('message', 'Order fetched successfully')
            ->assertJsonPath('data.id', $id);

        $this->getJson("{$this->order_uri}/999999")
            ->assertStatus(404)
            ->assertJson(['message' => 'Order not found']);

    }

    public function test_orders_by_user_filters_by_user_id(): void
    {

        // Create users
        $u1 = DB::table('users')->insertGetId([
            'name' => 'Alpha',
            'email' => 'alpha@example.com',
            'password' => bcrypt('secret'),
        ]);

        $u2 = DB::table('users')->insertGetId([
            'name' => 'Beta',
            'email' => 'beta@example.com',
            'password' => bcrypt('secret'),
        ]);

        $u1OrderIds = [];

        for ($i = 1; $i <= 3; $i++) {

            $u1OrderIds[] = DB::table('orders')->insertGetId([
                'user_id' => $u1,
                'status' => 'open',
                'price' => 200 + $i,
            ]);

        }

        for ($i = 1; $i <= 2; $i++) {

            DB::table('orders')->insert([
                'user_id' => $u2,
                'status' => 'open',
                'price' => 300 + $i,
            ]);

        }

        $response = $this->getJson("{$this->orders_by_user_uri}/{$u1}")->assertOk();

        $response->assertJson(fn (AssertableJson $json) =>
            $json->where('message', 'Orders fetched successfully')
                ->has('data', 3)
        );

        $returnedIds = collect($response->json('data'))
            ->pluck('id')
            ->sort()
            ->values()
            ->all();

        sort($u1OrderIds);

        $this->assertSame($u1OrderIds, $returnedIds);

    }

    private function create_user_for_test()
    {
        // Create a user
        return User::query()->create(
            [
                'name' => 'Test User',
                'email' => 'test@user.com',
                'password' => bcrypt('secret')
            ]
        );
    }
}
