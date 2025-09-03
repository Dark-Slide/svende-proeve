<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PublicEndpointsTest extends TestCase
{
    use RefreshDatabase;

    public function test_frontpage_is_public(): void
    {

        $response = $this->get('/frontpage');
        $this->assertFalse(in_array($response->getStatusCode(), [401, 403], true));

    }

    public function test_products_is_public(): void
    {

        $response = $this->get('/api/products');
        $this->assertFalse(in_array($response->getStatusCode(), [401, 403], true));

    }

    public function test_product_show_is_public_even_if_not_found(): void
    {

        $response = $this->get('/api/product/999999');
        $this->assertFalse(in_array($response->getStatusCode(), [401, 403], true));

    }

    public function test_user_show_is_public_even_if_not_found(): void
    {

        $response = $this->get('/api/user/999999');

        $this->assertFalse(
            in_array(
                $response->getStatusCode(), [401, 403], true)
        );

    }

    public function test_orders_is_public(): void
    {

        $response = $this->get('/api/orders');
        $this->assertFalse(in_array($response->getStatusCode(), [401, 403], true));

    }

    public function test_order_show_is_public_even_if_not_found(): void
    {

        $response = $this->get('/api/order/999999');
        $this->assertFalse(in_array($response->getStatusCode(), [401, 403], true));

    }

    public function test_orders_by_user_is_public(): void
    {

        $response = $this->get('/api/orders/user/1');
        $this->assertFalse(in_array($response->getStatusCode(), [401, 403], true));

    }

    public function test_order_lines_by_order_is_public(): void
    {

        $response = $this->get('/api/order_lines/order/1');
        $this->assertFalse(in_array($response->getStatusCode(), [401, 403], true));

    }

    public function test_products_by_category_is_public(): void
    {

        $response = $this->get('/api/products/category/somecategory');
        $this->assertFalse(in_array($response->getStatusCode(), [401, 403], true));

    }
}
