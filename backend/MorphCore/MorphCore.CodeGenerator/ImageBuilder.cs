namespace MorphCore.CodeGenerator;

public class ImageBuilder
{
    public System.Text.StringBuilder Builder { get; set; }

    public ImageBuilder()
    {
        this.Builder = new System.Text.StringBuilder();
    }

    private int GetWidthToType(int charCount)
    {
        return 34 + (charCount * 5);
    }

    private int GetWidth(int charCount)
    {
        return (GetWidthToType(charCount) + 60);
    }

    private void BeginSvg(int width = 1000, int height = 1000) 
    {
        this.Builder.AppendLine($"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"{width}\" height=\"{height}\">");

        this.Builder.AppendLine("<defs><style>@import url(\"https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i\");</style></defs>");
        this.Builder.AppendLine("<style><![CDATA[svg text{stroke:none}]]></style>");
    } 

    private void EndSvg()
    {
        this.Builder.AppendLine("</svg>");
    }

    private void Frame(int x, int y, int width, int height, bool innerFrame = true)
    {
        if (innerFrame)
        {
            this.Builder.AppendLine($"<rect x=\"{x}\" y=\"{y}\" width=\"{width}\" height=\"{height}\" style=\"fill:rgb(254,245,219);stroke:rgb(228,220,197);stroke-width:1;\" />");
        }
        else
        {
            this.Builder.AppendLine($"<rect x=\"{x}\" y=\"{y}\" width=\"{width}\" height=\"{height}\" style=\"fill:white;stroke:rgb(48,159,219);stroke-width:1;\" />");
        }
    }


    private void DrawSeparator(int x, int y, int width, int height)
    {
        this.Builder.AppendLine($"<rect x=\"{x}\" y=\"{y}\" width=\"{width}\" height=\"{height}\" style=\"fill:rgb(254,245,219);\" />");
    
        // left line        
        this.Builder.AppendLine($"<line x1=\"{x}\" y1=\"{y}\" x2=\"{x}\" y2=\"{y+height}\" style=\"stroke:rgb(228,220,197);stroke-width:1;\" />");

        // right line
        this.Builder.AppendLine($"<line x1=\"{x+width}\" y1=\"{y}\" x2=\"{x+width}\" y2=\"{y+height}\" style=\"stroke:rgb(228,220,197);stroke-width:1;\" />");  

        // right line
        this.Builder.AppendLine($"<line x1=\"{x}\" y1=\"{y+(height/2)}\" x2=\"{x+width}\" y2=\"{y+(height/2)}\" style=\"stroke:rgb(228,220,197);stroke-width:1;\" />");      
    }

    private void DrawHorizonalLine(int x, int y, int width)
    {
         this.Builder.AppendLine($"<line x1=\"{x}\" y1=\"{y}\" x2=\"{x+width}\" y2=\"{y}\" style=\"stroke:rgb(228,220,197);stroke-width:1;\" />");       
    }

    private void DrawFrame(int x, int y, int width, int height)
    {
        this.Builder.AppendLine($"<rect x=\"{x}\" y=\"{y}\" width=\"{width}\" height=\"{height}\" style=\"fill:rgb(254,245,219);\" />");
    
        // left line        
        this.Builder.AppendLine($"<line x1=\"{x}\" y1=\"{y}\" x2=\"{x}\" y2=\"{y+height}\" style=\"stroke:rgb(228,220,197);stroke-width:1;\" />");

        // right line
        this.Builder.AppendLine($"<line x1=\"{x+width}\" y1=\"{y}\" x2=\"{x+width}\" y2=\"{y+height}\" style=\"stroke:rgb(228,220,197);stroke-width:1;\" />");      
    }

    private void DrawBlueFrame(int x, int y, int width, int height)
    {
        this.Builder.AppendLine($"<rect x=\"{x}\" y=\"{y}\" width=\"{width}\" height=\"{height}\" style=\"fill:white;stroke:rgb(48,159,219);stroke-width:1;\" />");
    }

    private void DrawText(int x, int y, bool isPrimary, bool isForeign, bool isRequired, string name, string dataType)
    {          
        x += 4;
        // Primary Key
        if (isPrimary)
            this.Builder.AppendLine($"<text x=\"{x}\" y=\"{y}\" font-family=\"Roboto\" font-size=\"7pt\" >P</text>"); 

        x += 8;
        // Foreign Key
        if (isForeign)
            this.Builder.AppendLine($"<text x=\"{x}\" y=\"{y}\" font-family=\"Roboto\" font-size=\"7pt\" >F</text>"); 
        
        x += 8;
        // Required
        if (isRequired)
            this.Builder.AppendLine($"<text x=\"{x}\" y=\"{y}\" fill=\"red\" font-family=\"Roboto\" font-size=\"7pt\" >*</text>"); 
        
        x += 18;
        // Name
        if (string.IsNullOrWhiteSpace(name) == false)
            this.Builder.AppendLine($"<text x=\"{x}\" y=\"{y}\" font-family=\"Roboto\" font-size=\"7pt\" >{name}</text>"); 
        
        x += 210;
        // Type
        if (string.IsNullOrWhiteSpace(dataType) == false)
            this.Builder.AppendLine($"<text x=\"{x}\" y=\"{y}\" font-family=\"Roboto\" font-size=\"7pt\" fill=\"rgb(152,147,160)\" >{dataType}</text>");          
    }  

    private void DrawCenteredText(int x, int y, string text)
    {
        if (string.IsNullOrWhiteSpace(text) == false)
        {
            this.Builder.AppendLine($"<text x=\"{x}\" y=\"{y}\" font-family=\"Roboto\" font-size=\"7pt\" font-weight=\"bold\" text-anchor=\"middle\">{text}</text>");  
        }          
    }

    private void DrawBox(int x, int y, int width, int height) 
    {
        this.Builder.AppendLine($"<rect x=\"{x}\" y=\"{y}\" width=\"{width}\" height=\"{height}\" style=\"fill:rgb(254,245,219);stroke:rgb(228,220,197);stroke-width:1;\"/>");
    }

    private void DrawDot(int x, int y)
    {
        this.Builder.AppendLine($"<circle cx=\"{x}\" cy=\"{y}\" r=\"1\" />");
    }

    private void Title(int x, int y, int width, int height, string text)
    {
        this.Builder.AppendLine($"<rect x=\"{x}\" y=\"{y}\" width=\"{width}\" height=\"{height}\" style=\"fill:rgb(254,245,219);stroke:rgb(228,220,197);stroke-width:1;\"/>");

        x += (width/2);
        y += 12;

        this.Builder.AppendLine($"<text x=\"{x}\" y=\"{y}\" font-family=\"Roboto\" font-size=\"7pt\" font-weight=\"bold\" text-anchor=\"middle\">{text}</text>"); 
    }

    private void Column(int x, int y, bool isPrimary, bool isForeign, bool isRequired, string name, string dataType)
    {
        // Primary Key
        if (isPrimary)
            this.Builder.AppendLine($"<text x=\"{x}\" y=\"{y}\" font-family=\"Roboto\" font-size=\"7pt\" >P</text>"); 

        x += 8;
        // Foreign Key
        if (isForeign)
            this.Builder.AppendLine($"<text x=\"{x}\" y=\"{y}\" font-family=\"Roboto\" font-size=\"7pt\" >F</text>"); 
        
        x += 8;
        // Required
        if (isRequired)
            this.Builder.AppendLine($"<text x=\"{x}\" y=\"{y}\" fill=\"red\" font-family=\"Roboto\" font-size=\"7pt\" >*</text>"); 
        
        x += 18;
        // Name
        if (string.IsNullOrWhiteSpace(name) == false)
            this.Builder.AppendLine($"<text x=\"{x}\" y=\"{y}\" font-family=\"Roboto\" font-size=\"7pt\" >{name}</text>"); 
        
        x += 210;
        // Type
        if (string.IsNullOrWhiteSpace(dataType) == false)
            this.Builder.AppendLine($"<text x=\"{x}\" y=\"{y}\" font-family=\"Roboto\" font-size=\"7pt\" fill=\"rgb(152,147,160)\" >{dataType}</text>");        
    }

    private int GetWidth() 
    {
        return 380;
    }

    private int GetHeight(int count)
    {
        return 20 + 8 + count * 16;
    }

    public string ToString(int width, int height, List<ModelNode> nodes)
    {
        int baseline = 10;
        int titleBaseline = baseline + 5;

        BeginSvg(width, height);

        nodes.ForEach(n => {
            var r = n.Rect.Inflate(3);
            DrawBlueFrame(r.X, r.Y, r.Width, r.Height);

            n.Items.ForEach(i => {
                if (i.Type == ModelItemType.Text) 
                {
                    DrawFrame(i.Rect.X, i.Rect.Y, i.Rect.Width, i.Rect.Height);
                    DrawText(i.Rect.X, i.Rect.Y + baseline, i.IsPrimary, i.IsForeign, i.IsRequired, i.Text, i.Extent);
                }
                else if (i.Type == ModelItemType.Separator) 
                {
                    DrawSeparator(i.Rect.X, i.Rect.Y, i.Rect.Width, i.Rect.Height);
                }
                else if (i.Type == ModelItemType.HorizontalLine)
                {
                    DrawHorizonalLine(i.Rect.X, i.Rect.Y, i.Rect.Width);
                }
                else if (i.Type == ModelItemType.Title)
                {
                    DrawFrame(i.Rect.X, i.Rect.Y, i.Rect.Width, i.Rect.Height);
                    DrawHorizonalLine(i.Rect.X, i.Rect.Y, i.Rect.Width);
                    DrawCenteredText(i.Rect.X + (i.Rect.Width / 2), i.Rect.Y + titleBaseline, i.Text);
                }
            });     
        });

        EndSvg();

        return this.Builder.ToString();
    }       
}