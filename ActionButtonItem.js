import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

export default class ActionButtonItem extends Component {
  
_renderTitle() {
    if (!this.props.title) return null;

    const {
      textContainerStyle,
      hideLabelShadow,
      offsetX,
      parentSize,
      size,
      position,
      spaceBetween
    } = this.props;
    const offsetTop = Math.max(size / 2 - TEXT_HEIGHT / 2, 0);
    const positionStyles = { top: offsetTop };
    const hideShadow = hideLabelShadow === undefined
      ? this.props.hideShadow
      : hideLabelShadow;

    if (position !== "center") {
      positionStyles[position] =
        offsetX + (parentSize - size) / 2 + size + spaceBetween;
    } else {
      positionStyles.right = WIDTH / 2 + size / 2 + spaceBetween;
    }

    const textStyles = [
      styles.textContainer,
      positionStyles,
      !hideShadow && shadowStyle,
      textContainerStyle
    ];

    const title = (
      React.isValidElement(this.props.title) ?
        this.props.title
      : (
        <Text
          allowFontScaling={false}
          style={[styles.text, this.props.textStyle]}
        >
          {this.props.title}
        </Text>
      )
    )

    return (
      <TextTouchable
        background={touchableBackground(
          this.props.nativeFeedbackRippleColor,
          this.props.fixNativeFeedbackRadius
        )}
        activeOpacity={this.props.activeOpacity || DEFAULT_ACTIVE_OPACITY}
        onPress={this.props.onPress}
      >
        <View style={textStyles}>
          {title}
        </View>
      </TextTouchable>
    );
  }
  render() {
    const offsetX = this.props.radius * Math.cos(this.props.angle);
    const offsetY = this.props.radius * Math.sin(this.props.angle);
    return (
      <Animated.View
        style={[{
          opacity: this.props.anim,
          width: this.props.size,
          height: this.props.size,
          transform: [
            {
              translateY: this.props.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, offsetY],
              }) },
            {
              translateX: this.props.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, offsetX],
              }) },
            {
              rotate: this.props.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [`${this.props.startDegree}deg`, `${this.props.endDegree}deg`],
              }) },
            {
              scale: this.props.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }) },
          ]
        }]}
      >
        <TouchableOpacity style={{flex:1}} activeOpacity={this.props.activeOpacity || 0.85} onPress={this.props.onPress}>
          <View
            style={[styles.actionButton,{
              width: this.props.size,
              height: this.props.size,
              borderRadius: this.props.size / 2,
              backgroundColor: this.props.buttonColor,
            }]}
          >
            {this.props.children}
          </View>
            {this._renderTitle()}
        </TouchableOpacity>
      </Animated.View>
    );
  }

}

ActionButtonItem.propTypes = {
  angle: PropTypes.number,
  radius: PropTypes.number,
  buttonColor: PropTypes.string,
  onPress: PropTypes.func,
  children: PropTypes.node.isRequired,
  startDegree: PropTypes.number,
  endDegree: PropTypes.number,
};

ActionButtonItem.defaultProps = {
  onPress: () => {},
  startDegree: 0,
  endDegree: 720
};

const styles = StyleSheet.create({
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: '#444',
    shadowRadius: 1,
    backgroundColor: 'red',
    position: 'absolute',
  },
});
