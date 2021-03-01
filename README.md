# Post Migration Content Parser

This script is intended to take a csv file exported from our Wordpress website and remove old Avada theme shortcode.

## Preferred Pre-requisites

Please make sure you use WP All Export to generate your `posts.csv` file from Wordpress.

## How To Use

1. Save a csv file named `posts.csv` in the main script directory that is exported from Wordpress (preferrably using WP All Export plugin).
2. Check the heading settings in the `parse.js` file, and confirm they align with the column headings in your `posts.csv` file.
3. Run `npm run parse` in your terminal.
4. This will output a new csv file called `parsedContent.csv` with no shortcode included in the content.