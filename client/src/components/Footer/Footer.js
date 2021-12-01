import classes from './Footer.module.css'
import github from '../../img/github.svg'
import mail from '../../img/email.svg'
import phone from '../../img/phone-call.svg'
import whatsapp from '../../img/whatsapp.svg'

export const Footer = () => (
  <footer>
    <div className={classes.footer}>
      <a
        href="https://github.com/realcrazyn/"
        target="_blank"
        rel="noreferrer"
        className={classes.footer_github__link}
      >
        <img src={github} alt="github" className={classes.footer_github__img} />
      </a>
      <a
        href="mailto:realcrazyn@yandex.ru"
        className={classes.footer_mail__link}
      >
        <img src={mail} alt="mail" className={classes.footer_mail__img} />
      </a>
      <a href="tel:+79652669947" className={classes.footer_phone__link}>
        <img src={phone} alt="phone" className={classes.footer_phone__img} />
      </a>
      <a
        href="https://api.whatsapp.com/send/?phone=79652669947"
        className={classes.footer_whatsapp__link}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={whatsapp}
          alt="whatsapp"
          className={classes.footer_whatsapp__img}
        />
      </a>
    </div>
    <p className={classes.footer_name}>© 2021 Realcrazyn</p>
  </footer>
)
