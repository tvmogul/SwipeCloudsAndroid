package com.sergioapps.utils;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import java.io.IOException;
import java.io.StringReader;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

/**
 * The XMLParser class contains methods regarding the parsing XML.
 * <p>
 * Created by M1040100 on 30-Jan-18.
 *
 * @version 1.0.
 */

public final class XMLParser {

    private XMLParser() {
        // This utility class is not publicly instantiable
    }

    /**
     * Gets the {@link Document} from XML string.
     *
     * @param response String to be converted as Document.
     * @return Returns the Document.
     */
    public static Document getXmlElement(String response) {

        Document doc = null;

        try {

            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = null;

            builder = factory.newDocumentBuilder();

            doc = builder.parse(new InputSource(new StringReader(response)));

            Element element = doc.getDocumentElement();
            element.normalize();

        } catch (ParserConfigurationException | SAXException | IOException e) {
            e.printStackTrace();
        }

        return doc;
    }

    /**
     * Gets the Nodelist from {@link Document}.
     *
     * @param document Used to get Nodelist.
     * @param tagName  Tagname to get Nodelist.
     * @return Returns the Nodelist.
     */
    public static NodeList getNodeList(Document document, String tagName) {
        return document.getElementsByTagName(tagName);
    }

    /**
     * Gets the Xml value from @{@link NodeList}.
     *
     * @param nList Nodelist to get Xml value.
     * @param value Key value to get Xml value.
     * @return Returns Xml value.
     */
    public static String getXmlValue(NodeList nList, String value) {

        for (int i = 0; i < nList.getLength(); i++) {

            Node node = nList.item(i);
            if (node.getNodeType() == Node.ELEMENT_NODE) {
                Element element = (Element) node;

                return getValue(value, element);
            }
        }

        return null;
    }

    /**
     * Gets the Xml value from {@link Element}.
     *
     * @param tag     Key value to get Xml value.
     * @param element Element to get Xml value.
     * @return Returns string Xml value.
     */
    private static String getValue(String tag, Element element) {
        NodeList nodeList = element.getElementsByTagName(tag).item(0).getChildNodes();
        Node node = nodeList.item(0);
        return node.getNodeValue();
    }

}
