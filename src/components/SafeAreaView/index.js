// Don't use buildin ReactNative's SafeArea because it not support iphoneXR,XSMax ..

import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    isIphoneX,
    isIphoneXSMax,
    isIOS,
    BOTTOM_SPACE,
    STATUS_BAR_HEIGHT
} from '../../utils/iPhoneXHelper';

type Props = {
    style: Object,
    keepBottomSpace?: boolean,
    gradient?: boolean
};
export default class SafeArea extends React.Component<Props> {
    static defaultProps = {
        gradient: false
    };

    render() {
        const { style, children, keepBottomSpace, gradient } = this.props;
        if ((!isIphoneX && !isIphoneXSMax) || !isIOS) {
            if (gradient) {
                return (
                    <LinearGradient
                        start={{ x: 0.0, y: 0.0 }}
                        end={{ x: 1.0, y: 0.0 }}
                        colors={['#942ad1', '#e041b1']}
                        style={styles.container}
                    >
                        {children}
                    </LinearGradient>
                );
            }
            return (
                <View
                    style={[
                        styles.container,
                        { backgroundColor: '#fff' },
                        style && style
                    ]}
                >
                    {children}
                </View>
            );
        }
        //
        if (gradient) {
            return (
                <LinearGradient
                    start={{ x: 0.0, y: 0.0 }}
                    end={{ x: 1.0, y: 0.0 }}
                    colors={['#942ad1', '#e041b1']}
                    style={[
                        styles.container,
                        {
                            paddingBottom: keepBottomSpace ? BOTTOM_SPACE : 0,
                            backgroundColor: '#fff'
                        },
                        style && style
                    ]}
                >
                    {children}
                </LinearGradient>
            );
        }
        return (
            <View
                style={[
                    styles.container,
                    {
                        paddingBottom: keepBottomSpace ? BOTTOM_SPACE : 0,
                        backgroundColor: '#fff'
                    },
                    style && style
                ]}
            >
                {children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: STATUS_BAR_HEIGHT,
        opacity: 1
    }
});
