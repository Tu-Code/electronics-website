<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!-- Define the transformation rules -->
    <xsl:template match="/">
        <html>
            <head>
                <title>Terms and Conditions</title>
                <!-- Include your CSS styles here -->
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { text-align: center; }
                    p { line-height: 1.5; margin-bottom: 15px; }
                    /* Add more styles as needed */
                </style>
            </head>
            <body>
                <!-- Transform your XML content into HTML here -->
                <!-- Use xsl:apply-templates to match XML elements -->
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>

    <!-- Define templates for different XML elements -->
    <!-- Example: match 'h1' elements and transform them to 'h1' in HTML -->
    <xsl:template match="h1">
        <h1>
            <xsl:apply-templates/>
        </h1>
    </xsl:template>

    <!-- Add more templates as needed for different XML elements -->
</xsl:stylesheet>
