<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LogoutTest extends TestCase
{

    use RefreshDatabase;

    public function test_logs_out_and_invalidates_session(): void
    {

        $user = User::factory()->create();

        $this->actingAs($user);

        $response = $this->postJson('/logout');

        $response->assertOk()->assertJson(['ok' => true]);

        $this->assertGuest();

    }

}
