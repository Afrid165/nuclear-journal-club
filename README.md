# Nuclear Journal Club

Website for the Wayne State Nuclear Theory Group's Journal Club, where members present scientific papers every week.

## About

The Nuclear Journal Club brings together researchers, graduate students, and faculty members to discuss cutting-edge research in nuclear physics. Each week, a member presents a recent publication, fostering critical thinking and collaborative learning.

## Website Features

- **Home Page**: Overview of the journal club with the next upcoming presentation
- **Schedule**: List of all upcoming presentations
- **Archive**: Searchable archive of past presentations with filtering by year
- **About**: Information about the journal club and how to participate

## Structure

The website is a static site built with HTML, CSS, and JavaScript:

```
├── index.html          # Home page
├── schedule.html       # Upcoming presentations schedule
├── archive.html        # Past presentations archive
├── about.html          # About the journal club
├── styles.css          # Styling for all pages
├── script.js           # JavaScript for dynamic content and data
└── README.md           # This file
```

## Deployment

### GitHub Pages

This website is ready to be deployed on GitHub Pages:

1. Go to your repository settings
2. Navigate to "Pages" section
3. Under "Source", select the branch (e.g., `main` or `copilot/create-journal-club-website`)
4. Select the root folder `/` as the source
5. Save and wait for the deployment

Your site will be available at: `https://[username].github.io/nuclear-journal-club/`

### Local Development

To view the website locally, simply open `index.html` in a web browser. For a better development experience with live reload:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## Updating Content

### Adding New Presentations

To add new presentations, edit the `presentations` array in `script.js`:

```javascript
{
    id: 6,
    date: "2026-02-03",
    title: "Your Paper Title",
    presenter: "Presenter Name",
    authors: "Author names",
    journal: "Journal Name",
    year: 2026,
    abstract: "Paper abstract...",
    status: "upcoming"
}
```

The website will automatically:
- Display upcoming presentations on the Schedule page
- Show the next presentation on the Home page
- Move past presentations to the Archive page

### Date Format

Use ISO date format: `YYYY-MM-DD` (e.g., `2026-01-20`)

## Customization

### Colors

Edit the CSS variables in `styles.css` to match your branding:

```css
:root {
    --primary-color: #1a237e;
    --secondary-color: #283593;
    --accent-color: #5c6bc0;
    /* ... */
}
```

### Meeting Information

Update the meeting details in `about.html` to reflect your actual schedule and location.

## Browser Support

The website works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

This project is open source and available for use by the Wayne State Nuclear Theory Group.

## Contact

For questions about the journal club or website, contact the Wayne State Nuclear Theory Group.
