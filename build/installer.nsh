!pragma warning disable all
!include "MUI2.nsh"

!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_LICENSE "${PROJECT_DIR}\\license.txt"
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES


!macro customUnInit
  MessageBox MB_YESNO "Are you sure you want to uninstall ${PRODUCT_NAME}?" IDYES +2
  Abort
!macroend

!define MUI_CUSTOMFUNCTION_UNINIT "${customUnInit}"
Function un.onUninstSuccess
  HideWindow
  MessageBox MB_ICONINFORMATION|MB_OK "${PRODUCT_NAME} was successfully removed from your system."
FunctionEnd

Section "Uninstall"
  ; Delete your app's contents
  Delete "$INSTDIR\*.*"
  RMDir /r "$INSTDIR"

  ; Attempt to clean parent directory only if empty
  Push "$INSTDIR"
  Call un.GetParent
  Pop $0

  IfFileExists "$0\*.*" skipRemoveParent
  RMDir "$0"
  skipRemoveParent:

SectionEnd

Function un.GetParent
  Exch $0
  Push $1

  ; Copy up to last backslash
  StrCpy $1 $0
  FindLastChar:
    StrCpy $0 $1 -1
    StrCmp $0 "" done
    StrCmp $0 "\" found
    StrCpy $1 $1 -1
    Goto FindLastChar
  found:
    StrCpy $0 $1
  done:
    Exch $0
    Pop $1
FunctionEnd