export default function RatingStart({ count }) {
    return Array(Math.round(count))
        .fill(null)
        .map((_item, index) => (
            <span key={index}>
                <i className="fa-solid fa-star"></i>
            </span>
        ));
}
