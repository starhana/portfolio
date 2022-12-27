window.addEventListener('DOMContentLoaded', function()
{
    //디바이스 체크
    function Mobile(){
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    const wrap = document.querySelector(".wrap");


        if (Mobile()){// 모바일일 경우
            wrap.classList.add("mobile");
            wrap.classList.remove("pc");
            
        } else {// 모바일 외

            wrap.classList.add("pc");
            wrap.classList.remove("mobile");
        }

    /*footer 생성하는 함수 */
    function footer(footer_text){
        const section = document.createElement("section");

        section.className = "footer";
        
        wrap.appendChild(section);
        
        section.innerHTML=`<div class="inner"><p class="txt-blue"> ${footer_text} </p></div>`;

    }

    //main 모션
    const main = document.querySelector(".main");
    const main_img_box = document.querySelector(".main .img-box");

    if(main){
        main.classList.add("true");
        
        if(Mobile()){
            main_img_box.style.left = `0px`;
            main_img_box.style.top = `0px`;
        }else{
            let mouseX = 0;
            let mouseY = 0;
        
            let currentX = 0;
            let currentY = 0;
        
            function mouseMoveEvent(e){
                mouseX = e.clientX;
                mouseY = e.clientY;
            }
            
            main.addEventListener('mousemove',mouseMoveEvent);
        
            tick();
            function tick(){  
                requestAnimationFrame(tick);//실시간
        
                currentX += (mouseX / 20 - currentX) * 0.1 ;
                currentY += (mouseY / 20 - currentY) * 0.1 ;
        
                main_img_box.style.left = `${currentX}px`;
                main_img_box.style.top = `${currentY}px`;
            }

            function mouseoutEvent(){
                mouseX = 0;
                mouseY = 0;
            }
            main.addEventListener('mouseout',mouseoutEvent);
        }
        
    }

    
    function scrollEvent(){  

        //현제 스크롤바 위치
        const pageY = window.pageYOffset;
        //화면 높이
        const window_height = window.innerHeight;
        //보여질 화면 값
        const pos = pageY + window_height - (window_height / 3);

        //section class name
        const about = document.querySelector(".about");
        const information = document.querySelector(".information");
        const information_box = document.querySelectorAll(".information .information-box");
        const portfolio = document.querySelector(".portfolio")
        const portfoliolist = document.querySelector(".portfolio-list");
        const project_body = document.querySelector(".project-body");
        const project_img = document.querySelector(".project-img");

        /*about*/
        if(about){
            if(pos > about.offsetTop){
                const about_images = document.querySelector(".about .me-images");
                const about_self = document.querySelector(".about .self");

                const about_images_pos  = window.pageYOffset + about_images.getBoundingClientRect().top;
                const about_self_pos = window.pageYOffset + about_self.getBoundingClientRect().top;
        
                if(pos > about_images_pos){
                    about_images.classList.add("true");
                }
        
                if(pos > about_self_pos){
                    about_self.classList.add("true");
                }
            }
        }
        
        /*information*/
        if(information){
            for(let i = 0; i < information_box.length; i++ ){
                const information_box_pos = window.pageYOffset + information_box[i].getBoundingClientRect().top;
                if(pos > information_box_pos){
                    information_box[i].classList.add("true");
                }
            }
        }
        
        /*portfolio*/
        if(portfolio){
            const portfoliolist_pos = window.pageYOffset + portfoliolist.getBoundingClientRect().top;
            if(pos > portfoliolist_pos){
                portfoliolist.classList.add("true");
            }
        }
        
        /*project*/
        if(project_body){
            const project_body_pos = window.pageYOffset + project_body.getBoundingClientRect().top;

            if(project_img){//프로젝트 이미지가 있는 경우
                const project_img_pos = window.pageYOffset + project_img.getBoundingClientRect().top;
                if(pos > project_body_pos){
                    project_body.classList.add("true");
                }
                if(pos > project_img_pos){
                    project_img.classList.add("true");
                }
            }else if(!project_img){//없는 경우
                if(pos > project_body_pos){
                    project_body.classList.add("true");
                }
            }
        }
    }

    //footer 생성하는 함수
    footer('2022 HANBYUL PORTFOLIO');

    window.addEventListener('scroll', scrollEvent);

});
