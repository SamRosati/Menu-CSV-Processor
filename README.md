# Menu CSV Processor

A Node.js utility that automates the formatting and pricing of restaurant menu data. It reads raw CSV data, organizes items by meal type, calculates updated pricing, and generates a clean, formatted text file.

## Features

- **CSV Parsing**: Reads `menu.csv` and parses raw comma-separated values, cleaning currency symbols automatically.
- **Automatic Grouping**: Organizes menu items into distinct categories (e.g., Lunch, Dinner, Dessert).
- **Alphabetical Sorting**: Sorts items alphabetically by name within their specific categories.
- **Price Calculation**: Applies a **1.8x markup** to the base price found in the CSV and formats it to two decimal places.
- **Formatted Output**: Exports the final menu to `menu.txt` with clear headers and tab-separated pricing.

## Project Structure

- `main.js`: The entry point script containing the logic for reading, parsing, grouping, and writing data.
- `menu.csv`: The input file containing raw item data in the format: `type,name,quantity,price`.
- `menu.txt`: The generated output file containing the pretty-printed menu.

## Getting Started

### Prerequisites
- Node.js (uses standard `fs/promises` and `os` modules, no external dependencies required).

### Usage

1. Ensure `menu.csv` is present in the root directory.
2. Run the script using Node.js:
   ```bash
   node main.js
