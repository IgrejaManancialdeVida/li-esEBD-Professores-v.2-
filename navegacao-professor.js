document.addEventListener("DOMContentLoaded", function () {

    // Não duplica se já existir a barra
    if (document.getElementById('nav-professor')) return;

    const nav = document.createElement('nav');
    nav.id = 'nav-professor';
    nav.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
        background: linear-gradient(90deg, #050f07, #0a1a0d);
        border-bottom: 1px solid rgba(39,174,96,0.4);
        display: flex; align-items: stretch;
        box-shadow: 0 2px 16px rgba(0,0,0,0.6);
        font-family: 'Oswald', sans-serif;
    `;

    // Marca
    const marca = document.createElement('div');
    marca.style.cssText = `
        font-family: 'Cinzel', serif; font-size: 9pt; color: #c9a84c;
        letter-spacing: 3px; padding: 0 18px; display: flex; flex-direction: column;
        align-items: flex-start; justify-content: center;
        border-right: 1px solid rgba(39,174,96,0.2); white-space: nowrap;
    `;
    marca.innerHTML = `ESCHATON<span style="font-family:'Oswald',sans-serif;font-size:6.5pt;color:rgba(39,174,96,0.6);letter-spacing:1.5px;text-transform:uppercase;margin-top:1px;">Guia do Prof.</span>`;

    // Links dos volumes
    const volumes = [
        { nome: 'Volume I',   link: 'https://igrejamanancialdevida.github.io/li-esebd/index-professor.html' },
        { nome: 'Volume II',  link: 'https://igrejamanancialdevida.github.io/li-esebd-v.2-/index-professor.html' },
        { nome: 'Volume III', link: 'https://igrejamanancialdevida.github.io/li-esebd-v.3/index-professor.html' }
    ];

    const href = window.location.href;
    const isVol1 = href.includes('li-esebd/') && !href.includes('v.2') && !href.includes('v.3');
    const isVol2 = href.includes('v.2-') || href.includes('li-esebd-v.2');
    const isVol3 = href.includes('v.3');

    const atualIdx = isVol1 ? 0 : isVol2 ? 1 : isVol3 ? 2 : 1;

    const navVols = document.createElement('div');
    navVols.style.cssText = `display:flex; align-items:stretch; flex:1; justify-content:center;`;

    volumes.forEach((vol, i) => {
        const a = document.createElement('a');
        a.innerText = vol.nome;
        a.href = vol.link;
        const ativo = i === atualIdx;
        a.style.cssText = `
            font-family: 'Oswald', sans-serif; font-size: 8.5pt; letter-spacing: 2px;
            text-transform: uppercase; text-decoration: none;
            color: ${ativo ? '#52c27a' : 'rgba(39,174,96,0.5)'};
            background: ${ativo ? 'rgba(39,174,96,0.10)' : 'transparent'};
            padding: 0 20px; display: flex; align-items: center;
            border-right: 1px solid rgba(39,174,96,0.1);
            transition: all 0.2s; position: relative;
        `;
        if (ativo) {
            const indicador = document.createElement('span');
            indicador.style.cssText = `
                position:absolute; bottom:0; left:0; right:0; height:2px;
                background: linear-gradient(90deg, transparent, #27ae60, transparent);
            `;
            a.appendChild(indicador);
        }
        a.onmouseover = () => {
            a.style.color = '#52c27a';
            a.style.background = 'rgba(39,174,96,0.07)';
        };
        a.onmouseout = () => {
            a.style.color = ativo ? '#52c27a' : 'rgba(39,174,96,0.5)';
            a.style.background = ativo ? 'rgba(39,174,96,0.10)' : 'transparent';
        };
        navVols.appendChild(a);
    });

    // Badge "Versão Professor"
    const badge = document.createElement('div');
    badge.style.cssText = `
        font-family: 'Oswald', sans-serif; font-size: 7pt; letter-spacing: 2px;
        text-transform: uppercase; color: rgba(39,174,96,0.7);
        padding: 0 14px; display: flex; align-items: center; gap: 6px;
        border-left: 1px solid rgba(39,174,96,0.2); margin-left: auto; white-space: nowrap;
    `;
    badge.innerHTML = `<span style="color:#27ae60;">✦</span> Versão Professor`;

    nav.appendChild(marca);
    nav.appendChild(navVols);
    nav.appendChild(badge);
    document.body.prepend(nav);

    // Ajusta padding do body para não esconder conteúdo
    const navH = nav.offsetHeight || 44;
    document.body.style.paddingTop = navH + 'px';

    // Responsividade: esconde marca e badge em telas pequenas
    function ajustarMobile() {
        if (window.innerWidth <= 480) {
            marca.style.display = 'none';
            badge.style.display = 'none';
        } else if (window.innerWidth <= 768) {
            marca.style.display = 'none';
            badge.style.display = 'flex';
        } else {
            marca.style.display = 'flex';
            badge.style.display = 'flex';
        }
    }
    ajustarMobile();
    window.addEventListener('resize', ajustarMobile);
});
