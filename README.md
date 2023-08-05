# OG Scrapi

OG Scrapi is a Deno API that retrieves Open Graph (OG) meta tags and other metadata from a given URL, providing a convenient way to access and utilize website metadata.

## Getting Started

### Prerequisites

- [Deno](https://deno.land/) - A secure runtime for JavaScript and TypeScript.

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/paripsky/og-scrapi.git
   cd og-scrapi
   ```

2. Run the Deno server:

   ```sh
   deno run --allow-net --allow-read main.ts
   ```

## Usage

### Endpoints

- `GET /`: Welcome message.

- `GET /api/meta?url=<URL>`: Get Open Graph (OG) meta tags and other metadata from the specified URL.

#### Example

Request:

```
GET /api/meta?url=https://example.com
```

Response:

```json
{
  "og:title": "Example",
  "og:description": "An example website",
  "og:image": "https://example.com/image.png",
  "title": "Welcome to Example"
  // ...other metadata
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Deno](https://deno.land/)
- [oak](https://deno.land/x/oak)
- [cors](https://deno.land/x/cors)
- [deno_dom](https://deno.land/x/deno_dom)

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.
