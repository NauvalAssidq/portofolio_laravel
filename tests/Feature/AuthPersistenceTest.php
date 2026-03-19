<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthPersistenceTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function authenticated_user_is_redirected_from_login_page()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/login');

        $response->assertRedirect('/');
    }

    /** @test */
    public function guest_can_access_login_page()
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    /** @test */
    public function login_with_remember_me_sets_cookie()
    {
        $user = User::factory()->create([
            'password' => bcrypt($password = 'password'),
        ]);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => $password,
            'remember' => true,
        ]);

        $response->assertRedirect('/admin');
        $this->assertAuthenticatedAs($user);
        
        // Verify that the remember_token is set on the user
        $user->refresh();
        $this->assertNotNull($user->remember_token);
        
        // Check for the remember cookie
        $response->assertCookie(\Auth::guard()->getRecallerName());
    }
}
