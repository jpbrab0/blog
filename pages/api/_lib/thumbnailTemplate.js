export default function getThumbnailTemplate(req,res) {
    const { title } = req.query

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
      <title>Thumbnail</title>
    
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet">
    
      <style>
        body {
          margin: 0;
          font-family: Roboto, sans-serif;
          color: #FFF;
          background: #121214;
          background-image: 
            radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2%, transparent 0%), 
            radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.2) 2%, transparent 0%);
          background-size: 100px 100px;
          height: 100vh;
        }
    
        #wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
    
        img {
          height: 25px;
          margin-right:13px
        }
    
        h1 {
          font-size: 62px;
          line-height: 80px;
    
          max-width: 80%;
        }
        .twitter{
            width:100;
            display:flex;
            flex-direction:row;
            align-items:center
        }
      </style>
    </head>
    <body>
      <div id="wrapper">
        <h1>${title}</h1>

        <div class="twitter">
            <img src="https://upload.wikimedia.org/wikipedia/pt/thumb/3/3d/Twitter_logo_2012.svg/1200px-Twitter_logo_2012.svg.png">
            <p>jpbrab0</p>
        </div>
      </div>
    </body>
    </html>
    `
}