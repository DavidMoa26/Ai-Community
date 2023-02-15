const HideCheckBox = ({ hideHandler, value, name }) => {
    return (
        <div className="mb-20">
            <input type="checkbox" onClick={hideHandler} value={value} />
            <label className="ml-2 text-sm font-bold">Hide {name} Posts</label>
        </div>
    )
}
export default HideCheckBox