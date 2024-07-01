import {NavDropdown} from "react-bootstrap";
import {useTranslation} from "react-i18next";

export const Language = (props) => {
    const languages = {
        en: {nativeName: 'English'},
        vi: {nativeName: 'Tiếng Việt'}
    };
    
    const {t, i18n} = useTranslation();

    const language = languages[i18n.resolvedLanguage];

    console.log(language, typeof (language))
    return (
        <>
            <NavDropdown title={language.nativeName}
                         id="basic-nav-setting"
                         className={'language'}>
                <NavDropdown.Item
                    onClick={() => i18n.changeLanguage('vi')}>{languages.vi.nativeName}
                </NavDropdown.Item>
                <NavDropdown.Item
                    onClick={() => i18n.changeLanguage('en')}>{languages.en.nativeName}
                </NavDropdown.Item>
            </NavDropdown>
        </>
    )
}