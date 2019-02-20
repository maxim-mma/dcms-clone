import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import styled from "react-emotion";
import { colors, borders, lengths } from "netlify-cms-ui-default";

const Card = styled.div`
  width: ${props => props.width};
  height: 240px;
  margin: ${props => props.margin};
  border: ${borders.textField};
  border-color: ${props => props.isSelected && colors.active};
  border-radius: ${lengths.borderRadius};
  cursor: pointer;
  overflow: hidden;
  background-color: ${props => props.isPrivate && colors.textFieldBorder};

  &:focus {
    outline: none;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 2px 2px 0 0;
`;

const CardFileIcon = styled.div`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 2px 2px 0 0;
  padding: 1em;
  font-size: 3em;
`;

const CardText = styled.p`
  color: ${colors.text};
  padding: 8px;
  margin-top: 20px;
  overflow-wrap: break-word;
  line-height: 1.3 !important;
`;

class MediaLibraryCard extends React.Component {
  render() {
    const {
      isSelected,
      displayURL,
      text,
      onClick,
      width,
      margin,
      isPrivate,
      type
    } = this.props;
    const url = displayURL.get("url");
    const isFetching = displayURL.get("isFetching");
    const err = displayURL.get("err");
    return (
      <Card
        isSelected={isSelected}
        onClick={onClick}
        width={width}
        margin={margin}
        tabIndex="-1"
        isPrivate={isPrivate}
      >
        <div>
          {url ? <CardImage src={url} /> : <CardFileIcon>{type}</CardFileIcon>}
        </div>
        <CardText>{text}</CardText>
      </Card>
    );
  }
  componentWillMount() {
    const { displayURL, loadDisplayURL } = this.props;
    if (
      !displayURL ||
      (!displayURL.url && !displayURL.isFetching && !displayURL.err)
    ) {
      loadDisplayURL();
    }
  }
}

MediaLibraryCard.propTypes = {
  isSelected: PropTypes.bool,
  displayURL: ImmutablePropTypes.map.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  margin: PropTypes.string.isRequired,
  isPrivate: PropTypes.bool,
  type: PropTypes.string
};

export default MediaLibraryCard;
