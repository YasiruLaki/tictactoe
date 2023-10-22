import "./form.css"

function Form() {
    return(
        <div>
            <div>
                <h1 className="form-head">Got something to say? Drop a line</h1>
                <form>
                    <input 
                    className="form-input"
                    placeholder="Name (Optional)">
                    </input><br></br>
                    <textarea 
                    className="form-input"
                    placeholder="Message" required>
                    </textarea><br></br>
                    <button type="submit" className="form-btn">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Form;