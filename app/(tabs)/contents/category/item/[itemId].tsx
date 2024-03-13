import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {Image} from 'expo-image';
import {Stack, useLocalSearchParams} from 'expo-router';
import useItem from '@/hooks/use-item';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

function ItemScreen() {
  const {itemId} = useLocalSearchParams<{itemId: string}>();
  const [webViewHeight, setWebViewHeight] = useState(0);
  const {data} = useItem(itemId!);

  const mainImage = data?.primary_image_url
    ? data?.primary_image_url.replace('https', 'http')
    : '';

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: data?.title,
        }}
      />
      <ScrollView>
        <Image
          style={styles.image}
          source={mainImage}
          placeholder={blurhash}
          contentFit="contain"
          transition={1000}
        />

        <WebView
          automaticallyAdjustContentInsets={false}
          originWhitelist={['*']}
          style={{height: webViewHeight}}
          source={{
            html: `
      <head>

    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width user-scalable=no">
        <style>
          article {
            padding: 20px;
          }
          body {
            margin: 0;
            padding: 0;
          }
          font {
            font-size: 1.2em;
          }
        </style>
      </head>
      <body>
        <article>
          ${data?.app_content}
        </article>
      </body>
    `,
          }}
          injectedJavaScript={`
    setTimeout(function() { 
      window.ReactNativeWebView.postMessage(document.body.scrollHeight);
    }, 500);
    true; // note: this is required, or you'll sometimes get silent failures
  `}
          onMessage={event => {
            setWebViewHeight(Number(event.nativeEvent.data));
          }}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    backgroundColor: '#0553',
    height: 250,
  },
});

export default ItemScreen;
