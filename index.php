<!doctype html>
<?php
function numFilesInDir($directory)
{
    return count(glob($directory . '/*'));
}

?>

<html lang="en">

<head>
    <meta charset="utf-8" />
    <div style="margin-left: 10px; margin-top: 10px;">

        <style>
            .sidenav {
                height: 100%;
                width: 300px;
                position: fixed;
                z-index: 1;
                top: 0;
                left: 10px;
                padding-left: 10px;
                background-color: #f2f2f2;
                color: #A51E37;
                overflow-x: hidden;
            }

            .content {
                margin-left: 300px;
                padding-left: 20px;
                padding-bottom: 100px;
                color: #32414B;
            }
        </style>


        <div class="sidenav">
            <h1>Experiments</h1>
            <h3><a href="index.html">Flanker Task</a></h3>
        </div>


    </div>
</head>

</html>
