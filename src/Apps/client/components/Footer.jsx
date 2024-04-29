import React from 'react'
import footer from '../static/Footer.module.scss'

export default function Footer() {
  return (
    <>
      <footer className={`py-3 ${footer.footer_style}`}>
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className={`nav-item ${footer.footer_style_text}`}>
            <a href="#" className="nav-link px-2 text-body-secondary">
              О Нас
            </a>
          </li>
          <li className={`nav-item ${footer.footer_style_text}`}>
            <a href="#" className="nav-link px-2 text-body-secondary">
              Контакты
            </a>
          </li>
          <li className={`nav-item ${footer.footer_style_text}`}>
            <a href="#" className="nav-link px-2 text-body-secondary">
              Цены
            </a>
          </li>
          <li className={`nav-item ${footer.footer_style_text}`}>
            <a href="#" className="nav-link px-2 text-body-secondary">
              Документация
            </a>
          </li>
          <li className={`nav-item ${footer.footer_style_text}`}>
            <a href="#" className="nav-link px-2 text-body-secondary">
              Соглашения
            </a>
          </li>
        </ul>
        <p className={`text-center ${footer.footer_style_text}`}>
          © 2024 Powered by{' '}
          <a href="https://t.me/mgulyamov" className={footer.footer_powered}>
            Gulyamov
          </a>{' '}
          and{' '}
          <a href="https://t.me/Bomuratov" className={footer.footer_powered}>
            Bomuratov
          </a>
        </p>
      </footer>
    </>
  )
}
