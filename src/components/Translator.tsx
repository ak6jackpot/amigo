/* eslint-disable react/no-unstable-nested-components */
import {faLanguage, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Pressable,
  TextInput,
  View,
  Easing,
  Keyboard,
} from 'react-native';
import Typography from './Typography';
import {FlashList} from '@shopify/flash-list';
import {fetchTranslationOpenAI} from '../utils/serviceAPIcalls';
import {Color} from '../utils/displayUtils';

type TranslatorProps = {
  place: string;
};

export const Translator = ({place = 'Delhi'}: TranslatorProps) => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);
  const chatbotHeight = useRef(new Animated.Value(0)).current;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  let messageId = useRef(0);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const displayCity =
    place?.length > 22 ? place?.substring(0, 21) + '...' : place;
  const Message = ({text, isIncoming}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();
    }, []);

    return (
      <Animated.View
        style={[
          {
            borderRadius: 10,
            padding: 10,
            marginVertical: 5,
            maxWidth: '75%',
          },
          isIncoming
            ? {
                alignSelf: 'flex-start',
                backgroundColor: Color?.incomingMessage,
                marginLeft: 10,
              }
            : {
                alignSelf: 'flex-end',
                backgroundColor: Color?.outgoingMessage,
                marginRight: 10,
              },
          {
            opacity: fadeAnim,
            transform: [{translateY: translateYAnim}],
          },
        ]}>
        <Typography text={text} />
      </Animated.View>
    );
  };

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    const newMessage = {
      id: (messageId.current++).toString(),
      text: inputText,
      isIncoming: false,
    };

    setMessages([...messages, newMessage]);

    fetchTranslationOpenAI(inputText, place).then(res => {
      receiveMessage(
        `${res?.translation}\n\nPronounced: ${res?.pronunciation}`,
      );
    });
    setInputText('');
  };

  const receiveMessage = text => {
    const newMessage = {
      id: (messageId.current++).toString(),
      text: text,
      isIncoming: true,
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const toggleChatbot = () => {
    if (isChatbotVisible) {
      Animated.timing(chatbotHeight, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => {
        setChatbotVisible(false);
      });
    } else {
      setChatbotVisible(true);
      Animated.timing(chatbotHeight, {
        toValue: 300,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}>
      <Pressable
        onPress={toggleChatbot}
        style={({pressed}) => [
          {
            height: 60,
            aspectRatio: 1,
            backgroundColor: Color?.pinkPrimary,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            opacity: pressed ? 0.7 : 1,
          },
        ]}>
        <FontAwesomeIcon icon={faLanguage} size={'100%'} />
      </Pressable>

      {isChatbotVisible && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: 100,
              backgroundColor: 'white',
              borderRadius: 10,
              shadowColor: Color?.black,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
              overflow: 'hidden',
              width: 300,
            },
            {
              height: chatbotHeight,
              // marginBottom: keyboardHeight,
            },
          ]}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: Color?.graySend,
              justifyContent: 'center',
              alignItems: 'flex-start',
              backgroundColor: Color?.pinkPrimary,
              padding: 16,
              borderTopEndRadius: 10,
              borderTopStartRadius: 10,
            }}>
            <Typography text={'You are in ' + displayCity} size="medium" />
            <Typography text={'Type something you want to translate'} />
          </View>

          <View
            style={{
              flex: 1,
              minHeight: 150,
              overflow: 'scroll',
              flexDirection: 'row',
            }}>
            <FlashList
              data={messages}
              renderItem={({item}) => (
                <Message
                  key={item.id}
                  text={item.text}
                  isIncoming={item.isIncoming}
                />
              )}
              keyExtractor={item => item?.id}
              estimatedItemSize={103}
              showsVerticalScrollIndicator
              scrollEnabled
              keyboardShouldPersistTaps={'always'}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderTopWidth: 1,
              borderTopColor: Color?.graySend,
              alignItems: 'center',
            }}>
            <TextInput
              style={{
                height: 40,
                paddingLeft: 10,
                fontFamily: 'Ubuntu-Regular',
                flex: 4,
                color: Color?.black,
              }}
              autoFocus={true}
              placeholder="Type a phrase..."
              placeholderTextColor={Color?.black}
              value={inputText}
              onChangeText={setInputText}
            />
            <Pressable
              onPress={sendMessage}
              style={{
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                height: 40,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderLeftWidth: 3,
                borderColor: Color?.graySend,
                backgroundColor: Color?.graySend,
              }}>
              <FontAwesomeIcon icon={faPaperPlane} size={24} />
            </Pressable>
          </View>
        </Animated.View>
      )}
    </View>
  );
};
