# photo-ecommerce

ระบบร้านค้าออนไลน์ (E-commerce) สำหรับขายรูปภาพหรือสินค้าทั่วไป พัฒนาด้วย Next.js และเชื่อมต่อกับ Node.js Backend

## คุณสมบัติหลัก

- ระบบสมาชิก (Authentication): รองรับการสมัครสมาชิกและเข้าสู่ระบบ
- การจัดการสินค้า (Product Management): ดูรายการสินค้า, ค้นหาสินค้า และดูรายละเอียดสินค้า
- ตะกร้าสินค้า (Shopping Cart): เพิ่ม/ลดจำนวนสินค้า และลบสินค้าออกจากตะกร้า
- ระบบจัดการสำหรับผู้ดูแล (Admin Dashboard): จัดการสินค้า (เพิ่ม/ลบ/แก้ไข) และดูรายการสั่งซื้อ
- ระบบชำระเงิน (Payment Integration): รองรับการชำระเงินผ่าน Stripe
- การออกแบบที่รองรับทุกอุปกรณ์ (Responsive Design): ใช้งานได้ทั้งบนคอมพิวเตอร์และมือถือ

## เทคโนโลยีที่ใช้

### Frontend

- Next.js 15+ (App Router)
- React 19
- Tailwind CSS 4
- TypeScript
- Radix UI
- Lucide React
- Axios
- React Hook Form + Zod (สำหรับการจัดการฟอร์มและตรวจสอบข้อมูล)

### Backend

- Node.js
- Express
- MongoDB (Mongoose)

## การติดตั้งและการเริ่มใช้งาน

### การตั้งค่า Environment Variables

สร้างไฟล์ .env ในโฟลเดอร์ root และกำหนดค่าต่างๆ เช่น:
NEXT_PUBLIC_API_URL=[URL ของ Backend API]

### ขั้นตอนการรันโปรเจกต์

1. ติดตั้ง Dependencies:
   npm install

2. รันโปรเจกต์ในโหมด Development:
   npm run dev

3. เปิดเบราว์เซอร์และเข้าไปที่:
   http://localhost:3000

---

# photo-ecommerce

E-commerce platform for selling photos or general products, developed with Next.js and connected to a Node.js Backend.

## Key Features

- Authentication: Supports user registration and login.
- Product Management: View product lists, search, and view product details.
- Shopping Cart: Add/reduce quantities and remove items from the cart.
- Admin Dashboard: Manage products (Add/Delete/Edit) and view order lists.
- Payment Integration: Supports payments via Stripe.
- Responsive Design: Compatible with both desktop and mobile devices.

## Tech Stack

### Frontend

- Next.js 15+ (App Router)
- React 19
- Tailwind CSS 4
- TypeScript
- Radix UI
- Lucide React
- Axios
- React Hook Form + Zod (Form management and validation)

### Backend

- Node.js
- Express
- MongoDB (Mongoose)

## Installation and Getting Started

### Environment Variables Setup

Create a .env file in the root directory and define values such as:
NEXT_PUBLIC_API_URL=[Backend API URL]

### Project Startup Steps

1. Install Dependencies:
   npm install

2. Run in Development Mode:
   npm run dev

3. Open your browser and go to:
   http://localhost:3000
