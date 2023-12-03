<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!-- Define the transformation rules -->
    <xsl:template match="/">
        <html>
            <head>
                <title>Terms and Conditions</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { text-align: center; }
                    p { line-height: 1.5; margin-bottom: 15px; }
                    /* Add more styles as needed */
                </style>
            </head>
            <body>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="h1">
        <h1>
            <xsl:apply-templates/>
        </h1>
    </xsl:template>

</xsl:stylesheet>
