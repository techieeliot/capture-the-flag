import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch and process the flag
 */
export const useFlagFetcher = () => {
  const [flag, setFlag] = useState("Loading...");

  useEffect(() => {
    const captureTheFlag = async () => {
      try {
        /**
         * Fetch the HTML content
         */
        const response = await fetch(
          "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge"
        );
        const html = await response.text();

        /**
         * Parse the HTML and extract the required data
         */
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const startsWith92 = doc.querySelectorAll('section[data-id^="92"]');

        let concatenatedString = '';

        /**
         * Extract the values of the flag from the HTML
         */
        startsWith92.forEach((section) => {
          const endsWith45 = section.querySelector('article[data-class$="45"]');
          if (endsWith45) {
            const bRefs = endsWith45.querySelectorAll('b.ref');
            concatenatedString += Array.from(bRefs)
              .map((bElement) => bElement.getAttribute('value') || '')
              .join('');
          }
        });

        /**
         * Fetch the flag using the concatenated string
         */
        const flagResponse = await fetch(concatenatedString);
        const flagValue = await flagResponse.text();
        setFlag(flagValue);
      } catch (error) {
        console.error("Error fetching flag:", error);
        setFlag("Error fetching flag");
      }
    };

    captureTheFlag();
  }, []);

  return flag;
};

/**
 * Custom hook to simulate a typewriter effect
 */
export const useTypeWriter = (flag: string) => {
  const [word, setWord] = useState<string[]>();

  useEffect(() => {
    if (flag !== "Loading...") {
      let index = 0;
      /**
       * Dissplay the text character by character with a delay of a half second
       */
      const interval = setInterval(() => {
        setWord(flag.slice(0, index + 1).split(''));
        index++;
        if (index === flag.length) {
          clearInterval(interval);
        }
      }, 500); 

      return () => clearInterval(interval);
    }
  }, [flag]);

  return word;
};