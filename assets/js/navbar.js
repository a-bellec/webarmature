document.getElementById("navMenu").innerHTML =
    '<nav class="navbar navbar-inverse navbar-fixed-top">' +
        '<div class="container-fluid">' +
            '<div class="navbar-header">' +
                '<button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle">' +
                    '<span class="sr-only">Toggle navigation</span>' +
                    '<span class="icon-bar"></span>' +
                    '<span class="icon-bar"></span>' +
                    '<span class="icon-bar"></span>' +
                '</button>' +
                '<a href="index.html" class="navbar-brand">Armature</a>' +
            '</div>' +
            '<div class="navbar-collapse collapse" id="navbarCollapse">' +
                '<ul class="nav navbar-nav">' +
                        '<li> <a href="about.html"> <i class="fa fa-question-circle"> </i> À propos </a> </li>' +
                        '<li> <a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="about-btn"> <i class="fa fa-envelope"> </i> Contact </a> </li>' +
                        '<li> <a href="partners.html"> <i class="fa fa-users fontawesome"> </i> Partenaires </a> </li>' +
                        '<li> <a href="map.html"> <i class="fa fa-map"> </i> Cartes </a></li>' +
                    '<li class="dropdown">' +
                        '<a role="button" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-flask"> </i> Lab <b class="caret"></b> </a>' +
                        '<ul class="dropdown-menu">' +
                            '<li> <a href="lab00.html" data-toggle="collapse" data-target=".navbar-collapse.in" id="full-extent-btn"> <i class="fa fa-wrench"> </i> Menu des labs</a> </li>' +
                            '<li> <a href="lab01.html" data-toggle="collapse" data-target=".navbar-collapse.in" id="full-extent-btn"> <i class="fa fa-wrench"> </i> Géoportail</a> </li>' +
                            '<li> <a href="lab02.html" data-toggle="collapse" data-target=".navbar-collapse.in" id="full-extent-btn"> <i class="fa fa-wrench"> </i> Assemblage pseudo-ortho</a> </li>' +
                            '<li> <a href="lab03.html" data-toggle="collapse" data-target=".navbar-collapse.in" id="full-extent-btn"> <i class="fa fa-wrench"> </i> Classification</a> </li>' +
                            '<li class="divider hidden-xs"> </li>' +
                            '<li> <a href="lab99.html" data-toggle="collapse" data-target=".navbar-collapse.in" id="full-extent-btn"> <i class="fa fa-wrench"> </i> WebMap</a> </li>' +
                        '</ul>' +
                    '</li>' +
                '</ul>' +
            '</div>' +
        '</div>' +
    '</nav>';

document.getElementById("contactMenu").innerHTML =
    '<!-- mailling box -->'+
    '<div class="modal fade" id="aboutModal" tabindex="-1" role="dialog">'+
    '<div class="modal-dialog modal-lg">'+
        '<div class="modal-content">'+
            '<div class="row">'+
                '<div class="col-lg-12">'+
                    '<div class="well well-sm">'+
                        '<button class="close" type="button" data-dismiss="modal" aria-hidden="true">&times;</button>'+
                        '<h3>Envoyez nous un message  &nbsp;&nbsp;&nbsp;<i class="fa fa-paper-plane-o"></i></h3>'+
                        '<form role="form" id="contactForm" data-toggle="validator" class="shake">'+
                            '<div class="row">'+
                                '<div class="form-group col-sm-6">'+
                                    '<label for="name" class="h4">Nom</label>'+
                                    '<input type="text" class="form-control" id="name" placeholder="Nom & Prénom" required data-error="Veuillez compléter ce champ.">'+
                                    '<div class="help-block with-errors"></div>'+
                                '</div>'+
                                '<div class="form-group col-sm-6">'+
                                    '<label for="email" class="h4">Email</label>'+
                                    '<input type="email" class="form-control" id="email" placeholder="Votre email" required>'+
                                    '<div class="help-block with-errors"></div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label for="message" class="h4 ">Message</label>'+
                                '<textarea id="message" class="form-control" rows="5" placeholder="Entrez votre message" required></textarea>'+
                                '<div class="help-block with-errors"></div>'+
                            '</div>'+
                            '<button type="submit" id="form-submit" class="btn btn-success btn-lg pull-right ">Envoyer</button>'+
                            '<div id="msgSubmit" class="h3 text-center hidden"></div>'+
                            '<div class="clearfix"></div>'+
                        '</form>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div><!-- /.modal-content -->'+
        '</div><!-- /.modal-dialog -->'+
    '</div><!-- /.modal -->'+
    '<!-- /mailling box -->';