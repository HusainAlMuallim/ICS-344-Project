# Baseline Smoke Test

Run this before vulnerability testing so normal behavior is documented.

## Basic Checks

- Open the DVSA website.
- Register a user account.
- Log in successfully.
- Browse products.
- Add products to cart.
- Complete the main order flow as far as the deployment allows.
- Confirm CloudWatch logs are accessible.

## Capture

- Website home page screenshot
- Successful login screenshot
- Normal order/cart flow screenshot
- Key API endpoint or browser network capture
- One baseline CloudWatch log reference

## Notes

- Record any feature that fails before security testing begins.
- If baseline behavior is already broken, note it before attributing issues to a lesson.
