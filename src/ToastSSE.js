import { useEffect } from 'react'
import toast from 'react-hot-toast'

function ToastSSE() {
  // useEffect(() => {
  //   if (typeof window === 'undefined') return

  //   const uid = Math.random().toString(36).substring(2, 15) // Génère un UID unique
  //   let eventSource

  //   const connect = () => {
  //     eventSource = new EventSource(
  //       `http://localhost:3333/api/realtime/__transmit/events?uid=${uid}`
  //     )

  //     eventSource.addEventListener('notifications', (e) => {
  //       try {
  //         const data = JSON.parse(e.data)
  //         console.log("Message personnalisé reçu:", data)
  //         toast.success(data.message, {
  //           duration: 5000,
  //           position: 'top-right'
  //         })
  //         // toast.success(data.message);
  //       } catch (err) {
  //         console.error('Erreur SSE:', err)
  //       }
  //     })

  //     eventSource.addEventListener('$$transmit/ping', (e) => {
  //       console.log('Ping reçu:', e.data);
  //     });

  //     eventSource.onerror = () => {
  //       eventSource.close()
  //       setTimeout(connect, 3000)
  //     }
  //   }

  //   connect()

  //   return () => {
  //     if (eventSource) eventSource.close()
  //   }
  // }, [])
  useEffect(() => {
    const eventSource = new EventSource(
      'http://localhost:3333/api/realtime/__transmit/events?uid=notifications'
    );

      // Connexion réussie


    // Écoute spécifique
      eventSource.addEventListener('notifications', (e) => {
        const { data } = JSON.parse(e.data);
        console.log('coucou')
        toast.success(data.message, {
          duration: 5000,
          position: 'top-right'
        });
      });

    // Debug
      eventSource.onopen = () => {
        console.log('✅ Connexion SSE établie');
        console.log('État de la connexion:', eventSource.readyState); // 1 = OPEN
      };

      // Erreurs
      eventSource.onerror = (e) => {
        console.error('❌ Erreur SSE:', e);
        console.log('État de la connexion:', eventSource.readyState); // 2 = CLOSED
      };
    return () => eventSource.close();
  }, []);
  return null
}

export default ToastSSE