/* eslint-disable max-len */
import {
  ACTIVITY, AUTH, COMMON, ERROR, FORM, HINT, HOME, HOUSEHOLD, INFO, MORE, SETTINGS, SUCCESS,
} from '../constants/localeMessages'
import {
  LINKS, USER_VISIBILITY_TYPE, SETTING_COLUMNS, SETTING_CATEGORIES,
  CONNECTION_TABS, PROFILE_TABS, HOUSEHOLD_TABS, MORE_TABS,
} from '../constants'

export default {
  [ACTIVITY.CONNECTION_REQUEST]: 'Nová žádost o spojení od uživatele $1$.',
  [ACTIVITY.CONNECTION_APPROVAL]: 'Uživatel $1$ přijal vaši žádost o spojení.',
  [ACTIVITY.HOUSEHOLD_INVITATION]: 'Nová pozvánka do domácnosti $1$ od uživatele $2$.',
  [ACTIVITY.HOUSEHOLD_JOIN]: 'Uživatel $1$ se přidal do domácnosti $2$.',
  [ACTIVITY.HOUSEHOLD_LEAVE]: 'Uživatel $1$ opustil domácnost $2$.',
  [ACTIVITY.HOUSEHOLD_REMOVE]: 'Uživatel $1$ byl odstraněn z domácnosti $2$ uživatelem $3$.',
  [ACTIVITY.HOUSEHOLD_REMOVE_YOU]: 'Uživatel $1$ vás odstranil z domácnosti $2$.',
  [ACTIVITY.HOUSEHOLD_DELETE]: 'Uživatel $1$ smazal domácnost $2$.',

  [AUTH.BACK_TO_LOGIN]: 'Zpět na přihlášení',
  [AUTH.CREATE_ACCOUNT]: 'Vytvořit nový účet',
  [AUTH.DONT_HAVE_ACCOUNT]: 'Nemáte účet?',
  [AUTH.ENTER_EMAIL_QUOTE]: 'Zadejte Vaši emailovou adresu a my Vám zašleme link pro obnovu Vašeho hesla.',
  [AUTH.FORGOT_PASS]: 'Zapomenuté heslo?',
  [AUTH.HAVE_ACCOUNT]: 'Máte účet?',
  [AUTH.LOADING_DOTS]: 'Načítání...',
  [AUTH.LOG_IN]: 'Přihlásit se',
  [AUTH.LOG_IN_FACEBOOK]: 'Příhlásit se účtem Facebook',
  [AUTH.LOG_IN_GOOGLE]: 'Přihlásit se účtem Google',
  [AUTH.SEND_RESET_LINK]: 'Odeslat link',
  [AUTH.SIGN_UP]: 'Zaregistrovat se',
  [AUTH.TERMS_AGREEMENT]: 'Registrací potvrzujete naše ',

  [COMMON.AND_X_MORE]: 'A další\n@',
  [COMMON.ARE_YOU_SURE]: 'Opravdu provést?',
  [COMMON.CANT_UNDO]: 'Tuto akci nelze vzít zpět.',
  [COMMON.CANT_UNDO_SAVING]: 'Po uložení již nepůjde vzít tuto akci zpět.',
  [COMMON.CONFIRM]: 'Potvrdit',
  [COMMON.CONTRIBUTORS]: 'přispěvatelů',
  [COMMON.CANCEL]: 'Zrušit',
  [COMMON.CONTINUE]: 'Pokračovat',
  [COMMON.FINISH]: 'Dokončit',
  [COMMON.BACK]: 'Zpět',
  [COMMON.DONT_ASK_AGAIN]: 'Neptat se znovu',
  [COMMON.HIDE]: 'Skrýt',
  [COMMON.ADD_MESSAGE]: 'Přidat zprávu',
  [COMMON.MESSAGE]: 'Zpráva',
  [COMMON.NO_CONTENT]: 'Nebyl nalezen žádný obsah.',
  [COMMON.OR]: 'Nebo',
  [COMMON.SEARCH]: 'Hledat',
  [COMMON.SEARCHING]: 'Hledám',
  [COMMON.SENDING]: 'Odesílání',
  [COMMON.SHOW]: 'Zobrazit',
  [COMMON.TERMS_AND_CONDITIONS]: 'podmínky použití',
  [COMMON.TIME_PREFIX]: 'před',
  [COMMON.TIME_SUFFIX]: '',
  [COMMON.PHOTO_SIZE]: 'velikost obrázku',

  [ERROR.ADMIN_REQUIRED]: 'Každá domácnost musí mít alespoň jednoho správce.',
  [ERROR.CONNECTION_ERROR]: 'Chyba spojení, zkuste to prosím později.',
  [ERROR.CONNECTION_REQUEST_ERROR]: 'Žádost o spojení se nezdařila, zkuste to prosím později.',
  [ERROR.INVALID_REQUEST]: 'Požadovanou akci nelze provést.',
  [ERROR.ACTION_ERROR]: 'Požadovaná akce se nezdařila, zkuste to prosím později.',
  [ERROR.BAD_PERMISSIONS]: 'Špatné oprávnění.',
  [ERROR.EMAIL_USED]: 'Účet s tímto emailem již existuje.',
  [ERROR.GOOGLE_API_INIT_ERROR]: 'Chyba inicializace Google API.',
  [ERROR.IMAGE_INVALID]: 'Neplatný obrázek, prosím zkonrolujte zdali se jedná o obrázek s velikostí do 1MB',
  [ERROR.INCORRECT_PASS]: 'Špatné heslo.',
  [ERROR.INVALID_DATA]: 'Chybná data.',
  [ERROR.INVALID_EMAIL]: 'Neplatný email.',
  [ERROR.INVALID_FACEBOOK_DATA]: 'Chybná data Facebook.',
  [ERROR.INVALID_GOOGLE_DATA]: 'Chybná data Google.',
  [ERROR.UPLOADING_ERROR]: 'Došlo k chybě při nahrávání souborů, zkuste to prosím později.',
  [ERROR.LOG_IN_ERROR]: 'Během přihlašování došlo k chybě, zkuste to prosím později',
  [ERROR.LOG_IN_MISSING_FIELDS]: 'Přihlášení selhalo, chybí jedno nebo více povinných polí.',
  [ERROR.NO_ACCOUNT]: 'Účet s tímto emailem nebyl nalezen.',
  [ERROR.RESET_PASS_ERROR]: 'Během odesílání linku došlo k chybě, zkuste to prosím později',
  [ERROR.SIGN_UP_ERROR]: 'Během registrace došlo k chybě, zkuste to prosím později.',
  [ERROR.SMTH_BROKE_LOGIN]: 'Něco se porouchalo, zkuste prosím jinou metodu přihlášení.',
  [ERROR.VALUE_TOO_LONG]: 'Hodnota je příliš dlouhá.',
  [ERROR.VALUE_TOO_SHORT]: 'Hodnota je příliš krátká',

  [INFO.NOTHING_TO_UPDATE]: 'Žádné pole nebylo změněno.',

  [FORM.DELETE_ACCOUNT]: 'Smazat účet',
  [FORM.DROP_PHOTO_HERE]: 'Přetáhněte obrázek sem',
  [FORM.CLICK_TO_UPLOAD]: 'Klikněte pro nahrání obrázku',
  [FORM.EMAIL]: 'Email',
  [FORM.LANGUAGE]: 'Jazyk',
  [FORM.NEW_EMAIL]: 'Nový email',
  [FORM.NICKNAME]: 'Jméno',
  [FORM.DIALOGS]: 'Dialogy',
  [FORM.TUTORIAL_DIALOG]: 'Návodový dialog',
  [FORM.CONFIRMATION_DIALOGS]: 'Potvrzovací dialogy',
  [FORM.NOTIFICATIONS]: 'Notifikace',
  [FORM.CONNECTIONS]: 'Spojení',
  [FORM.HOUSEHOLDS]: 'Domácnosti',
  [FORM.NEW_NICKNAME]: 'Nové jméno',
  [FORM.PASSWORD]: 'Heslo',
  [FORM.THEME]: 'Prostředí',
  [FORM.OLD_PASSWORD]: 'Staré heslo',
  [FORM.NEW_PASSWORD]: 'Nové heslo',
  [FORM.USER_VISIBILITY]: 'Viditelnost',
  [FORM.CHANGE_PASSWORD]: 'Změnit heslo',
  [FORM.SET_ALIAS]: 'Nastavit přezdívku v domácnosti',
  [FORM.NO_HOUSEHOLD_REQUESTS]: 'Nemáte žádné pozvánky do domácností.',
  [FORM.NO_BLOCKED_CONNECTIONS]: 'Nemáte blokované žádné uživatele.',
  [FORM.NO_CONNECTION_REQUESTS]: 'Nemáte žádné žádosti o spojení.',
  [FORM.NO_CONNECTIONS]: 'Nemáte zatím žádná spojení.',
  [FORM.NO_DATA]: 'Nebyla nalezena žádná data.',
  [FORM.NO_CONNECTIONS_FOUND]: 'Nebyli nalezeni žádní uživatelé.',
  [FORM.SELECT_PHOTO]: 'Nahrajte nebo přetáhněte obrázek',
  [FORM.SAVE]: 'Uložit',
  [FORM.SAVING]: 'Ukládám',
  [FORM.APPROVE]: 'Schválit',
  [FORM.BLOCK]: 'Zablokovat',
  [FORM.UNBLOCK]: 'Odblokovat',
  [FORM.CONNECT]: 'Spojit se',
  [FORM.IGNORE]: 'Ignorovat',
  [FORM.REMOVE]: 'Odstranit',
  [FORM.CONNECTION_SENT]: 'Žádost odeslána',
  [FORM.PENDING_CONNECTIONS]: 'Žádosti o spojení',
  [FORM.MY_CONNECTIONS]: 'Moje spojení',
  [FORM.FIND_CONNECTION]: 'Hledat spojení',
  [FORM.BLOCKED_CONNECTIONS]: 'Blokovaní uživatelé',
  [FORM.HOUSEHOLD_INVITATIONS]: 'Pozvánky do domácností',
  [FORM.MUTUAL_FRIENDS]: 'Společných přátel',
  [FORM.EMAIL_NOTIFICATIONS]: 'Emailové notifikace',
  [FORM.MOBILE_NOTIFICATIONS]: 'Mobilní notifikace',
  [FORM.CONNECTION_APPROVAL]: 'Schválení žádosti',
  [FORM.CONNECTION_REQUEST]: 'Nová žádost',
  [FORM.HOUSEHOLD_DELETING]: 'Smazání rodiny',
  [FORM.HOUSEHOLD_EXPELLING]: 'Vyloučení člena z rodiny',
  [FORM.HOUSEHOLD_INVITATION]: 'Nová pozvánka do rodiny',
  [FORM.HOUSEHOLD_JOINING]: 'Přidání člena do rodiny',
  [FORM.HOUSEHOLD_LEAVING]: 'Odchod člena z rodiny',
  [FORM[USER_VISIBILITY_TYPE.FOF]]: 'přátelé přátel',
  [FORM[USER_VISIBILITY_TYPE.ALL]]: 'všichni',
  [FORM.HOUSEHOLD_USER_DELETING_DIALOG]: 'Při mazání člena domácnosti',

  [HINT.VISIBILITY]: 'Nastavuje kdo bude schopen Váš účet vyhledat a poslat žádost o spojení.',

  [HOME.NO_HOUSEHOLD]: `Vypadá to že zatím nejste členem žádné domácnosti. Začněte jejím @[${LINKS.NEW_HOUSEHOLD}]vytvořením@ nebo si @[${LINKS.FIND_CONNECTION}]najděte spojení@ a získejte pozvánku.`,

  [HOUSEHOLD.LEAVE]: 'Opustit domácnost',
  [HOUSEHOLD.LEAVING]: 'Opouštím',
  [HOUSEHOLD.DELETE]: 'Smazat domácnost',
  [HOUSEHOLD.DELETING]: 'Vymazávám',
  [HOUSEHOLD.CREATE]: 'Vytvořit domácnost',
  [HOUSEHOLD.CREATING]: 'Vytvářím',
  [HOUSEHOLD.MEMBER]: 'člen',
  [HOUSEHOLD.MEMBERS]: 'členů',
  [HOUSEHOLD.MEMBERS_SECTION]: 'členové',
  [HOUSEHOLD.CHANGE_ROLE]: 'Změnit roli',
  [HOUSEHOLD.REMOVE_USER]: 'Smazat uživatele',
  [HOUSEHOLD.CANCEL_REMOVE_USER]: 'Zrušit smazání',
  [HOUSEHOLD.INVITATIONS]: 'pozvánky',
  [HOUSEHOLD.INVITE_USERS]: 'pozvat členy',
  [HOUSEHOLD.SINCE]: 'od',
  [HOUSEHOLD.MODULES]: 'moduly',
  [HOUSEHOLD.ADD_MODULES]: 'přidat moduly',

  [MORE.ABOUT_THE_APPLICATION]: 'O aplikaci',
  [MORE.TEAM]: 'Tým',
  [MORE.CONTRIBUTORS]: 'Komunita',
  [MORE.SUPPORTERS]: 'Sponzoři',
  [MORE.FEZZI]: `
    Jsem nadšený full-stack vývojář s jasným cílem vytvořit snadno použitelnou, komunitou poháněnou a vysoce přizpůsobitelnou
    aplikaci bez zbytečného stalkingu a prodeje osobních údajů. Mimo to rád poskakuji ve čtvercové místnosti s raketou v ruce a
    žvatlám na kupu barevných krevetek.
  `,
  [MORE.ABOUT_TEXT]: `
    Tento projekt původně vznikl jako hřiště pro react, node a typescript.
    Krátce poté, jsem byl zasažen nápadem na aplikaci seskupující mnoho funkcionalit které příjdou vhod během obvyklých denních
    aktivit jak rodiny tak sdílené domácnosti libovolné velikosti. Tento nápad jako takový není ničím průlomový, i přes to se mi
    však nepodařilo najít jedinou aplikaci poskytující co jsem potřeboval. Vždy některé funkcionality chyběly a jiné přebývali.
    Brzy jsem si uvědomil, že poskytnout každou potřebnou funkcionalitu bez žádných přebytečných pro širší škálu uživatelů jednoduše
    není možné. Dokonce poskytnout vše potřebné jen malé skupině jedinců vyžaduje znatelnou vývojářskou sílu.
    S ohledem na tyto body jsem přišel s aplikací umožňující každému uživateli konfigurovat které funkcionality si on nebo ona
    přeje využívat. Mimoto je každá funkcionalita poskytována jako 'nezávislý' baliček ve veřejně dostupném gitHub repozitáři, čímž
    se efektivně kombinuje vývojářská síla celé komunity. Tímto způsobem si potom může každý vytvořit svoji vlastní novou
    funkcionalitu pro aplikaci.
  `,

  [SETTINGS[`${SETTING_COLUMNS.CATEGORY}_${SETTING_CATEGORIES.PROFILE}`]]: 'Profil',
  [SETTINGS[`${SETTING_COLUMNS.CATEGORY}_${SETTING_CATEGORIES.CONNECTIONS}`]]: 'Spojení',
  [SETTINGS[`${SETTING_COLUMNS.CATEGORY}_${SETTING_CATEGORIES.HOUSEHOLDS}`]]: 'Domácnosti',
  [SETTINGS[`${SETTING_COLUMNS.CATEGORY}_${SETTING_CATEGORIES.MORE}`]]: 'Více',
  [SETTINGS[`${SETTING_COLUMNS.TAB}_${PROFILE_TABS.GENERAL}`]]: 'Obecné',
  [SETTINGS[`${SETTING_COLUMNS.TAB}_${PROFILE_TABS.NOTIFICATIONS}`]]: 'Notifikace',
  [SETTINGS[`${SETTING_COLUMNS.TAB}_${PROFILE_TABS.DIALOGS}`]]: 'Dialogy',
  [SETTINGS[`${SETTING_COLUMNS.TAB}_${CONNECTION_TABS.MY_CONNECTIONS}`]]: 'Moje spojení',
  [SETTINGS[`${SETTING_COLUMNS.TAB}_${CONNECTION_TABS.PENDING}`]]: 'Žádosti',
  [SETTINGS[`${SETTING_COLUMNS.TAB}_${CONNECTION_TABS.BLOCKED}`]]: 'Blokování',
  [SETTINGS[`${SETTING_COLUMNS.TAB}_${CONNECTION_TABS.FIND_CONNECTION}`]]: 'Hledat spojení',
  [SETTINGS[`${SETTING_COLUMNS.TAB}_${HOUSEHOLD_TABS.NEW_HOUSEHOLD}`]]: 'Vytvořit domácnost',
  [SETTINGS[`${SETTING_COLUMNS.TAB}_${HOUSEHOLD_TABS.INVITATIONS}`]]: 'Pozvánky',
  [SETTINGS[`${SETTING_COLUMNS.TAB}_${HOUSEHOLD_TABS._HOUSEHOLD}`]]: 'Domácnost',
  [SETTINGS[`${SETTING_COLUMNS.TAB}_${MORE_TABS.ABOUT}`]]: 'Informace',
  [SETTINGS[`${SETTING_COLUMNS.TAB}_${MORE_TABS.SUPPORT}`]]: 'Podpořit',
  [SETTINGS[`${SETTING_COLUMNS.TAB}_${MORE_TABS.CONTRIBUTE}`]]: 'Podílet se',

  [SUCCESS.RESET_LINK]: 'Link pro obnovu hesla byl úspěšně zaslán na Vaši emailovou adresu.',
  [SUCCESS.SETTINGS_UPDATED]: 'Nastavaní bylo úspěšně upraveno.',
  [SUCCESS.ACCOUNT_CREATED]: 'Váš účet byl úspěšně vytvořen.',
  [SUCCESS.CONNECTION_REQUEST_SENT]: 'Žádost o spojení byla odeslána.',
}
