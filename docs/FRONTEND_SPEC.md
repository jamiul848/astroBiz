# AstroBiz OS — Frontend Specification

## Product

AstroBiz OS is a B2B SaaS operating system for professional astrologers.

The software helps astrologers manage their complete business from one application.

## Frontend Platforms

### Desktop

* HTML
* CSS
* JavaScript
* Tauri

### Mobile

* Flutter / Dart

### Backend

The backend will be developed separately by another developer.

The frontend must initially use mock data.

Do not implement database logic in the frontend.

Do not directly connect the frontend to PostgreSQL.

All future backend communication will happen through REST APIs.

---

# MVP Modules

1. Authentication
2. Dashboard
3. Customer Management
4. Kundali Management
5. Appointment Management
6. Services
7. Billing & Invoices
8. CRM / Follow-ups
9. Reports
10. Settings

---

# MVP User Flow

Login
→ Dashboard
→ Customers
→ Customer Profile
→ Birth Details
→ Kundali
→ Appointments
→ Consultation
→ Billing
→ Payment
→ CRM Timeline
→ Follow-up

---

# Desktop Navigation

Dashboard
Customers
Kundalis
Appointments
Services
Billing
CRM
Reports
Settings

---

# Mobile Navigation

Home
Customers
Calendar
More

---

# Dashboard

The dashboard should show:

* Today's revenue
* Total customers
* Today's appointments
* Pending payments
* Upcoming appointments
* Recent customers
* Follow-ups due
* Quick actions

Quick actions:

* Add Customer
* Generate Kundali
* New Appointment
* Create Invoice

---

# Customer Management

Customer fields:

* Full name
* Phone
* Email
* Address
* Date of birth
* Time of birth
* Birth place
* Latitude
* Longitude
* Timezone
* Notes
* Status

Customer statuses:

* New
* Active
* Follow-up
* Inactive
* VIP

Customer profile should contain:

* Basic information
* Birth details
* Kundalis
* Appointments
* Invoices
* Payments
* CRM timeline
* Notes

---

# Kundali Management

The frontend must display:

* Customer information
* Birth information
* Birth chart
* Planetary positions
* Dasha information
* Nakshatra
* Dosha information
* Saved reports
* Download PDF action

For MVP, use mock astrology data.

Do not implement astronomical calculations in the frontend.

---

# Appointment Management

Appointment fields:

* Customer
* Service
* Date
* Start time
* End time
* Status
* Notes

Statuses:

* Pending
* Confirmed
* Completed
* Cancelled
* No Show

Calendar should support:

* Day
* Week
* Month

---

# Services

Service fields:

* Service name
* Description
* Price
* Duration
* Active/inactive

Example services:

* Kundali Reading
* Marriage Consultation
* Career Consultation
* Full Horoscope

---

# Billing

Billing should contain:

* Invoice list
* Invoice details
* Customer
* Service
* Subtotal
* Discount
* Tax
* Total
* Payment status
* Payment method
* Invoice date
* Invoice number

Payment methods:

* UPI
* Cash
* Bank Transfer
* Other

---

# CRM

The MVP CRM should include:

* Customer notes
* Customer timeline
* Follow-up dates
* Customer status
* Recent interactions

Follow-up statuses:

* Today
* Upcoming
* Completed
* Overdue

---

# Reports

Initial reports:

* Revenue
* Number of customers
* Appointments
* Completed consultations
* Pending payments

Use mock data.

---

# Settings

Settings should include:

* Astrologer profile
* Business information
* Services
* Notification preferences
* Appearance
* Security
* Logout

---

# Design Requirements

The application should look like a professional modern SaaS product.

Design characteristics:

* Clean
* Premium
* Professional
* Minimal
* Trustworthy
* Spacious
* Easy to use

Avoid:

* Excessive astrology symbols
* Excessive gradients
* Clutter
* Excessive animations
* Cartoon-like visuals
* Unnecessary decorative elements

Use reusable components.

Every screen should support:

* Loading state
* Empty state
* Error state
* Success feedback
* Confirmation dialogs where appropriate

---

# Architecture Requirements

Separate:

* UI
* Components
* Models
* Mock data
* Repositories
* Services
* Utilities

Do not put business logic directly inside UI components.

Use a repository abstraction so mock repositories can later be replaced by REST API repositories.

Example:

UI
→ Controller / State
→ Repository
→ Mock Data

Later:

UI
→ Controller / State
→ Repository
→ REST API
→ Backend

---

# Important Development Rule

Do not build the entire application at once.

Build one module at a time.
First:

1. Design system
2. Desktop shell
3. Dashboard
4. Customers
5. Customer profile
6. Kundali
7. Appointments
8. Services
9. Billing
10. CRM
11. Reports
12. Settings

After the desktop MVP is stable, adapt the workflow to Flutter mobile.

Use mock data until the backend API is available.
