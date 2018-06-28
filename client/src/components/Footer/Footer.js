import React from "react";
import "./Footer.css";

const Footer = () => {
    return(
        <div>
        	<div className="footer-top">
		        <div className="container">
		        	<div className="row">
		        		<div className="col-md-3 footer-about wow fadeInUp">
		        			
		        			<p>
		        				Dr.William----Save your life!
		        			</p>
		        			<p><a href="#">Our Team</a></p>
	                    </div>
		        		<div className="col-md-4 offset-md-1 footer-contact wow fadeInDown">
		        			<h3>Contact</h3>
		                	<p><i className="fas fa-map-marker-alt"></i> 3900 Adeline St</p>
		                	<p><i className="fas fa-phone"></i> Phone: (520)301-7980</p>
		                	<p><i className="fas fa-envelope"></i> Email: <a href="mailto:hello@domain.com">williamNo1@gmail.com</a></p>
		                	<p><i className="fab fa-skype"></i> Skype: you_online</p>
	                    </div>
	                    <div className="col-md-4 footer-links wow fadeInUp">
	                    	<div className="row">
	                    		<div className="col">
	                    			<h3>Links</h3>
	                    		</div>
	                    	</div>
	                    	<div className="row">
	                    		<div className="col-md-6">
	                    			<p><a className="scroll-link" href="#top-content">Home</a></p>
	                    			<p><a href="#">Features</a></p>
	                    			<p><a href="#">How it works</a></p>
	                    			<p><a href="#">Our clients</a></p>
	                    		</div>
	                    		<div className="col-md-6">
	                    			<p><a href="#">Plans &amp; pricing</a></p>
	                    			<p><a href="#">Affiliates</a></p>
	                    			<p><a href="#">Terms</a></p>
	                    		</div>
	                    	</div>
	                    </div>
		            </div>
		        </div>
	        </div>
	        <div className="footer-bottom">
	        	<div className="container">
	        		<div className="row">
	           			<div className="col-md-6 footer-copyright">
	                    	&copy; by <a href="https://google.com">William</a>
	                    </div>
	           			<div className="col-md-6 footer-social">
	                    	<a href="#"><i className="fab fa-facebook-f"></i></a> 
							<a href="#"><i className="fab fa-twitter"></i></a> 
							<a href="#"><i className="fab fa-google-plus-g"></i></a> 
							<a href="#"><i className="fab fa-instagram"></i></a> 
							<a href="#"><i className="fab fa-pinterest"></i></a>
	                    </div>
	           		</div>
	        	</div>
	        </div>
        </div>
    )
}
    
export default Footer;