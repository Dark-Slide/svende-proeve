<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_logs_in_with_valid_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => 'password',
        ]);

        $response = $this->postJson('/login', [
            'email' => 'user@example.com',
            'password' => 'password',
        ]);

        $response->assertOk()
            ->assertJson(['ok' => true]);

        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);
    }

    public function test_rejects_invalid_credentials(): void
    {
        User::factory()->create([
            'email' => 'user@example.com',
            'password' => 'password',
        ]);

        $response = $this->postJson('/login', [
            'email' => 'user@example.com',
            'password' => 'wrong-password',
        ]);

        $response->assertStatus(422)
            ->assertJson(['message' => 'Invalid credentials']);

        $this->assertGuest();

    }

    public function test_login_validates_payload(): void
    {

        $response = $this->withHeader('Accept', 'application/json')
            ->post('/login');

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email', 'password']);

    }
}
