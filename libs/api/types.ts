import { TableStatus } from "@/components/real-time/table-grid";

export interface IUser {
	id: string;
    first_name: string;
    last_name: string;
    email: string;
    country_code: string;
    phone_number: string;
    profile_picture: string;
    points: number;
    phone_otp: string;
    email_otp: string;
    role: string;
    is_email_verified: boolean;
    is_mobile_verified: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface IDishCategory {
    id: string;
    name: string;
    picture: string;
    created_at: Date;
    updated_at: Date;
}

export interface IDish {
    id: string;
    name: string;
    price: number;
    picture: string;
    dish_category_id: string;
    is_available: boolean;
    is_non_veg: boolean;
    meta_data: object;
    created_at: Date;
    updated_at: Date;
}

export interface IDineInCheckout {
    id: string;
    user_id: string;
    booking_id: string;
    table_id: string;
    order_ids: string[];
    total_price: number;
    payment_status: string;
    payment_date: Date;
    is_checked_out: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface IDineInOrder {
    id: string;
    booking_id: string;
    user_id: string;
    table_id: string;
    dish_id: string;
    quantity: number;
    is_served: boolean;
    order_status: string;
    created_at: Date;
    updated_at: Date;
}

export interface IDineInTableBooking {
    id: string;
    table_id: string;
    user_id: string;
    booking_date: Date;
    booking_time: Date;
    from_time: Date;
    to_time?: Date;
    number_of_people?: number;
    is_confirmed: boolean;
    is_cancelled: boolean;
    is_completed: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface IDineInTable {
    id: string;
    table_number: string;
    is_available: boolean;
    capacity: number;
    meta_data: {
        status: TableStatus;
        qr_code: string;
    };
    created_at: Date;
    updated_at: Date;
}

export interface IReview {
	id: string;
    user_id: string;
    product_id: string;
    dish_id: string;
    rating: number;
    comment: string;
    meta_data: string;
    created_at: Date;
    updated_at: Date;
}