import React, {useCallback} from 'react';
import {TouchableOpacity, TouchableOpacityProps, Linking} from 'react-native';
import {Box, Text, Icon, IconProps} from 'components';
import {useNavigation} from '@react-navigation/native';
import {useI18n} from '@shopify/react-i18n';

interface InfoShareItemProps extends TouchableOpacityProps {
  onPress: () => void;
  text: string;
  icon: IconProps['name'];
  lastItem: boolean;
}
const InfoShareItem = ({onPress, text, icon, lastItem, ...touchableProps}: InfoShareItemProps) => (
  <>
    <TouchableOpacity onPress={onPress} accessibilityRole="button" {...touchableProps}>
      <Box
        paddingVertical="s"
        marginHorizontal="-m"
        paddingHorizontal="m"
        flexDirection="row"
        alignContent="center"
        justifyContent="space-between"
        backgroundColor="infoBlockNeutralBackground"
        borderRadius={5}
      >
        <Text variant="bodyText" marginVertical="s" color="overlayBodyText">
          {text}
        </Text>
        <Box alignSelf="center">
          <Icon size={25} name={icon} />
        </Box>
      </Box>
    </TouchableOpacity>
    {!lastItem && <Box height={5} marginHorizontal="-m" backgroundColor="overlayBackground" />}
  </>
);

export const InfoShareView = () => {
  const [i18n] = useI18n();
  const navigation = useNavigation();
  const onSymptomps = useCallback(() => {
    Linking.openURL(i18n.translate('Info.SymptomsUrl')).catch(err => console.error('An error occurred', err));
  }, [i18n]);

  // const onShare = useCallback(() => navigation.navigate('Sharing'), [navigation]);
  const onPrivacy = useCallback(() => navigation.navigate('Privacy'), [navigation]);
  const onLearnMore = useCallback(() => navigation.navigate('Tutorial'), [navigation]);
  const onLanguage = useCallback(() => navigation.navigate('LanguageSelect'), [navigation]);
  const onRegion = useCallback(() => navigation.navigate('RegionSelect'), [navigation]);

  return (
    <>
      <Box paddingHorizontal="m" borderRadius={10} overflow="hidden">
        <InfoShareItem
          onPress={onSymptomps}
          text={i18n.translate('Info.CheckSymptoms')}
          icon="icon-external-arrow"
          accessibilityLabel={i18n.translate('Info.CheckSymptoms')}
          accessibilityRole="link"
          accessibilityHint={i18n.translate('Home.ExternalLinkHint')}
          lastItem={false}
        />
        {/* <InfoShareItem onPress={onShare} text={i18n.translate('Info.TellAFriend')} icon="icon-share" /> */}
        <InfoShareItem lastItem onPress={onLearnMore} text={i18n.translate('Info.LearnMore')} icon="icon-chevron" />
      </Box>
      <Box paddingHorizontal="m" borderRadius={10} backgroundColor="infoBlockNeutralBackground" marginTop="m">
        <InfoShareItem
          onPress={onLanguage}
          text={i18n.translate('Info.ChangeLanguage')}
          icon="icon-chevron"
          lastItem={false}
        />
        <InfoShareItem
          onPress={onRegion}
          text={i18n.translate('Info.ChangeRegion')}
          icon="icon-chevron"
          lastItem={false}
        />
        <InfoShareItem onPress={onPrivacy} text={i18n.translate('Info.Privacy')} icon="icon-chevron" lastItem={false} />
      </Box>
    </>
  );
};
