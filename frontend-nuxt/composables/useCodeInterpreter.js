export default function useCodeInterpreter() {
    const codeInterpreter = (framework, code) => {
      /* eslint-disable no-useless-escape */
      let cssLink = framework === 'Bootstrap'
          ? '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"><\/script>'
          : '<script src="https://cdn.tailwindcss.com"><\/script>';
  
      return `<html>
                      <head>
                          ${cssLink}
                      </head>
                      <body style="background-color: #f9fafb;">
                          ${code}
                          <script>
                      document.addEventListener('DOMContentLoaded', function() {
                        var links = document.getElementsByTagName('a');
                        for (var i = 0; i < links.length; i++) {
                          links[i].addEventListener('click', function(e) {
                            e.preventDefault();
                          });
                        }
                      });
                    <\/script>
                      </body>
                  </html>`;
      /* eslint-enable no-useless-escape */
    }
  
    return { codeInterpreter };
  }
  