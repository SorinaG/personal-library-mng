
export default function useBookCover(isbn) {
    return isbn ? `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg` : null
}