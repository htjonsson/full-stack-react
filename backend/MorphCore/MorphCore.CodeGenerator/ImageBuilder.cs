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

    public override string ToString(SvgTable table)
    {
        BeginSvg(800, 800);

        int x = 50;
        int y = 100;
        int width = GetWidth();
        int height = GetHeight(table.Columns.Count);

        Frame(x - 3, y - 3, width + 6, height + 6, false);

        Frame(x, y, width, height);

        Title(x, y, width, 20, table.Title);

        y += 20 + 8 + 8;
        foreach(var column in table.Columns)
        {
            Column(x + 4, y, column.IsPrimary, column.IsForeign, column.isRequired, column.Name, column.DataType);
            y += 16;
        }

        EndSvg();

        return this.Builder.ToString();
    }
}

public class SvgTable 
{
    public string Title { get; set; } = string.Empty;
    public int Height { get; set; }
    public int Width { get; set; }
    public List<SvgColumn> Columns { get; set; } = new List<SvgColumn>();
}

public class SvgColumn
{
    public string Name { get; set; } = string.Empty;
    public string DataType { get; set; } = string.Empty;
    public bool IsPrimary { get; set; } = false;
    public bool IsForeign { get; set; } = false;
    public bool isRequired { get; set; } = false;    
}




