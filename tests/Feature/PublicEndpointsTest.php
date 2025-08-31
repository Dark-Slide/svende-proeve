<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PublicEndpointsTest extends TestCase
{
    use RefreshDatabase;

    public function test_frontpage_is_public(): void
    {
        $res = $this->get('/api/frontpage');
        $this->assertFalse(in_array($res->getStatusCode(), [401, 403], true));
    }

    public function test_products_is_public(): void
    {
        $res = $this->get('/api/products');
        $this->assertFalse(in_array($res->getStatusCode(), [401, 403], true));
    }

    public function test_product_show_is_public_even_if_not_found(): void
    {
        $res = $this->get('/api/product/999999');
        $this->assertFalse(in_array($res->getStatusCode(), [401, 403], true));
    }

    public function test_user_show_is_public_even_if_not_found(): void
    {
        $res = $this->get('/api/user/999999');
        $this->assertFalse(
            in_array(
                $res->getStatusCode(), [401, 403], true)
        );
    }
}
