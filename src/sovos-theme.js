import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
import { white } from 'material-ui/styles/colors';
import {
  primaryBlue,
  primaryNavy,
  primaryColorLight,
  buttonBlue,
  textColor,
  neutralWhite,
  grayLight,
  grayMedium,
  grayDark,
  blueLight,
  blueMedium,
  blueDark,
  yellowLight,
  yellowMedium,
  yellowDark,
  redLight,
  redMedium,
  redDark,
  yellow,
  green,
  darkBlue,
  magenta,
  pink,
  purple,
  aqua,
  black,
  orange
} from './sovos-colors';

export default {
  spacing,
  fontFamily: 'Roboto, Arial',
  /* this is currently required - the Snackbar's styles are not currently composable */
  snackbar: {
    actionColor: neutralWhite,
    textColor: neutralWhite,
    backgroundColor: blueDark,
    warningBackgroundColor: yellowMedium,
    errorBackgroundColor: redMedium
  },
  tableHeaderColumn: {
    height: 32,
    spacing: 12,
    textColor: fade(grayMedium, 0.8)
  },
  tableRow: {
    height: 32,
  },
  tableRowColumn: {
    height: 32,
    spacing: 12,
  },
  palette: {
    primary1Color: primaryBlue,
    primary2Color: primaryNavy,
    primary3Color: primaryColorLight,
    accent1Color: buttonBlue,
    textColor,
    alternateTextColor: white,
    canvasColor: white,
    disabledColor: fade(textColor, 0.3),
    pickerHeaderColor: primaryBlue,
    secondaryColor: purple,
    secondaryTextColor: neutralWhite,
    clockCircleColor: fade(textColor, 0.07),
    neutralColors: {
      white: neutralWhite,
      light: grayLight,
      normal: grayMedium,
      dark: grayDark,
      black
    },
    semanticColors: {
      good: {
        light: blueLight,
        normal: blueMedium,
        dark: blueDark
      },
      warning: {
        light: yellowLight,
        normal: yellowMedium,
        dark: yellowDark
      },
      danger: {
        light: redLight,
        normal: redMedium,
        dark: redDark
      }
    },
    accentColors: {
      blue: primaryBlue,
      yellow,
      green,
      darkBlue,
      magenta,
      pink,
      purple,
      aqua
    }
  },
  raisedButton: {
    labelStyle: {
      fontSize: '14px',
      fontWeight: '500'
    },
    primary: {
      backgroundColor: buttonBlue,
      disabledBackgroundColor: fade(buttonBlue, 0.15),
      labelColor: neutralWhite,
      disabledLabelColor: fade(neutralWhite, 0.3)
    },
    secondary: {
      backgroundColor: neutralWhite,
      disabledBackgroundColor: fade(neutralWhite, 0.15),
      labelColor: buttonBlue,
      disabledLabelColor: fade(buttonBlue, 0.3)
    }
  },
  flatButton: {
    labelStyle: {
      fontSize: '14px',
      fontWeight: '500'
    },
    primary: {
      labelColor: buttonBlue,
      hoverColor: fade(buttonBlue, 0.15),
      disabledLabelColor: fade(buttonBlue, 0.3)
    },
    secondary: {
      textColor: grayDark,
      hoverColor: fade(grayDark, 0.15),
      disabledLabelColor: fade(grayDark, 0.3)
    }
  },
  iconButton: {
    base: {
      style: {
        borderRadius: '50%',
        padding: 0
      },
      iconStyle: {
        color: fade(black, 0.87)
      }
    },
    small: {
      iconStyle: {
        width: 20,
        height: 20
      },
      style: {
        width: 36,
        minWidth: 36,
        height: 36
      },
    },
    medium: {
      iconStyle: {
        width: 24,
        height: 24
      },
      style: {
        width: 40,
        minWidth: 40,
        height: 40
      },
    },
    large: {
      iconStyle: {
        width: 28,
        height: 28
      },
      style: {
        width: 40,
        minWidth: 40,
        height: 40
      },
    }
  },
  heroBanner: {
    container: {
      backgroundColor: blueDark,
      padding: '1rem 30px',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 150,
      justifyContent: 'center',
    },
    title: {
      color: neutralWhite,
      fontFamily: "'Roboto', sans-serif",
      fontSize: '32px',
      fontWeight: '100',
      margin: '.5rem 0'
    },
    subtitles: {
      color: neutralWhite,
      fontFamily: "'Roboto', sans-serif",
      fontSize: '18px',
      fontWeight: '300',
      margin: '.25rem 0'
    }
  },

  navigation: {
    containerHidden: {
      width: 0,
      minWidth: 0,
      zIndex: 1301,
      position: 'relative'
    },
    containerOpen: {
      width: 240,
      minWidth: 240
    },
    container: {
      transition: 'width 290ms, min-width 290ms',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      height: '100vh',
      backgroundColor: '#3f5a72',
      width: 240,
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    innerContainer: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      width: 240
    },

    branding: {
      container: {
        height: 78,
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 22,
        textAlign: 'left',
        backgroundColor: '#395166',
      },
      containerCollapsed: {
        height: 0,
        textAlign: 'left',
      },
      logo: {
        height: 38,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100px 30px'
      },
      productName: {
        color: blueMedium,
        fontSize: 14
      }
    },

    links: {
      link: {
        color: '#FFF',
        fontWeight: 400,
        fontSize: 14,
        opacity: '0.7',
      },
      innerDivStyle: {
        padding: '13px 16px 11px 45px',
      },
      icons: {
        width: 18,
        height: 18,
        marginleft: 7,
      },
      container: {
        color: '#FFF',
        flexGrow: 1,
        marginTop: 5,
      },
      nestedList: {
        padding: 0
      }
    },

    footer: {
      height: 49,
      borderTop: '1px solid black',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'center',
    },

    context: {
      alias: {
        float: 'left',
        maxWidth: 140,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
      context: {
        height: 40,
        fontWeight: 400,
        fontSize: 14,
      },
      taxyear: {
        float: 'right',
        fontWeight: 700,
      },
      taxyearOpacity: {
        opacity: 0.5,
      },
      search: {
        minWidth: 250,
        height: 20,
        fontFamily: '"Roboto-Regular", Arial, sans-serif',
        borderBottom: '1px solid lightgrey',
        padding: '8px 8px 6px',
      },
      searchInput: {
        outline: 'none',
        border: 0,
        fontSize: 14,
      },
      dropdownContext: {
        minWidth: 250,
        height: 20,
        fontFamily: '"Roboto-Regular", Arial, sans-serif',
        fontSize: 14,
        padding: '8px 10px 3px 8px',
        position: 'relative',
        cursor: 'pointer',
      },
      dropdownContextName: {
        paddingRight: 5
      },
      dropdownContextHover: {
        backgroundColor: '#ebeef0',
      },
      overlay: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2000
      },
      icons: {
        width: 14,
        height: 14,
        marginRight: 8,
        float: 'left'
      },
      searchIcons: {
        width: 20,
        height: 20,
        marginRight: 4,
        float: 'left',
        margin: '8px 4px'
      },
    }
  },

  globalLayout: {
    titleBar: {
      container: {
        width: '100%',
        backgroundColor: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0px 1px 5px',
        position: 'relative'
      },
      topSection: {
        height: 50,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
      },
      breadCrumbContainer: {
        flex: '0 1 auto',
        minWidth: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'flex'
      },
      breadCrumb: {
        whiteSpace: 'nowrap',
        lineHeight: '50px',
        fontSize: 22,
        maxHeight: 50,
      },
      breadCrumbClickable: {
        fontSize: 22,
        padding: '6px',
        textTransform: 'none',
        fontWeight: 400,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'inline-block',
        maxWidth: '100%'
      },
      breadCrumbNonClickable: {
        padding: 6,
        lineHeight: '52px',
      },
      tabsContainer: {
        paddingLeft: 20,
      },
      tabItemContainer: {
        background: '#FFF',
        overflowX: 'scroll',
      },
      tabsInkBar: {
        height: 4,
      },
      navigationMenuButton: {
        height: 50,
        width: 50,
        flex: '0 0 50px',
      },
      rightIconContainer: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 15,
      },
    },

    appBar: {
      paddingRight: '20px',
      paddingLeft: '20px',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    appBarLeftIconAppend: {
      flexGrow: 1,
    },
    appBarAndContentContainer: {
      backgroundColor: grayLight,
      transition: 'left .3s ease-out',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    overlayVisible: {
      zIndex: 2000,
      background: 'rgba(0, 0, 0, 0.5)',
      position: 'fixed',
      left: 240,
      top: 0,
      bottom: 0,
      right: 0,
      transition: 'background 290ms, left 290ms ease-out'
    },
    overlayHidden: {
      clickable: false,
      zIndex: -1,
      background: 'rgba(0, 0, 0, 0.0)',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
      transition: 'left 290ms ease-out'
    }
  },

  dialog: {
    container: {
      gutter: 20
    },
    title: {
      fontSize: 20,
      color: fade(black, 0.9)
    },
    body: {
      fontSize: 13,
      color: fade(black, 0.5)
    }
  },
  list: {
    rowBorderColor: grayLight
  },
  historyList: {
    color: fade(black, 0.5),
    usernameColor: blueMedium
  },
  attachmentsList: {
    fileIcon: fade(orange, 0.8),
    infoColor: fade(black, 0.5)
  },
  settings: {
    backgroundColor: grayLight,
    titleColor: fade(black, 0.8),
    subtitleColor: fade(black, 0.5)
  }
};
