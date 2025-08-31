<?php

namespace Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegisterTest extends TestCase
{

    use RefreshDatabase;

    public function test_registers_user_logs_in_and_returns_201(): void
    {

        $payload = [
            'name' => 'Jane Doe',
            'email' => 'jane.doe@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ];

        $response = $this->postJson('/register', $payload);

        $response->assertCreated()
            ->assertJson(['ok' => true])
            ->assertJsonPath('user.email', 'jane.doe@example.com');

        $this->assertDatabaseHas('users', ['email' => 'jane.doe@example.com']);

        // Auth assertions
        $this->assertAuthenticated();

        $this->assertAuthenticatedAs(
            User::whereEmail('jane.doe@example.com')->first()
        );

    }

    public function test_register_validates_required_fields(): void
    {

        $response = $this
            ->withHeader('Accept', 'application/json')
            ->post('/register', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'email', 'password']);

    }

    public function test_register_rejects_duplicate_email(): void
    {

        User::factory()->create(['email' => 'taken@example.com']);

        $response = $this->postJson('/register', [
            'name' => 'John',
            'email' => 'taken@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);

    }
}
