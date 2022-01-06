(
    <div>
    <div className="my-listings-container">
        {details.map(tool => (
          <div className="tool-tile-container">
            <Link to={`/ListingExpanded`}>
            <div className="tool-index-photo-wrapper">
              <img className="tool-index-photo" src={"https://lda.lowes.com/is/image/Lowes/DP18-102358_NPC_BG_Wrench_AH?scl=1"} />
              <div className="tool-price">
              ${tool.price}<span className="price-per-day"> /day</span>
              </div>
            </div>
            <div className="bottom-bar">
              <p className="tool-name">
                  {tool.title}
              </p>
              <p className="tool-rating">{tool.rating_average}/5 <img src={rating_star}/></p>
            </div>
            </Link>
          </div>
          ))}
          
    </div>
    
    </div>
    
  )